import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
    games: [],
    publishers: [],
    categories: [],
    users: [],
    reviews: [],
    token: '',
    currCart: null,
    currWishlist: [],
    searchResults: [],
    currReceipts: [],
  },
  getters: {
  },
  mutations: {
    setCurrReceipts(state, receipts){
      state.currReceipts = receipts;
    },
    setSearchResults(state, results){
      state.searchResults = results;
    },
    setCurrWishlist(state, wishlist){
      state.currWishlist = wishlist;
    },
    setCurrCart(state, cart){
      state.currCart = cart;
    },
    setGames: function(state, games){
      state.games = games;
    },
    addGame:function(state, game){
      state.games.push(game);
    },
    setPublishers: function(state, publishers){
      state.publishers = publishers;
    },
    addPublisher: function(state, publisher){
      state.publishers.push(publisher);
    },
    setCategories: function(state, categories){
      state.categories = categories;
    },
    addCategory: function(state, category){
      state.categories.push(category);
    },
    setUsers: function(state, users){
      state.users = users;
    },
    addUser: function(state, user){
      state.users.push(user);
    },
    setReviews: function(state, reviews){
      state.reviews = reviews;
    },
    setReview: function(state, review){
      state.review = review;
    },
    setToken(state, token){
      state.token = token;
      localStorage.token = token;
    },
    removeToken(state){
      state.token = '';
      localStorage.token = '';
    },
    getToken(){
      return localStorage.token;
    },
    addReview: function(state, review){
      console.log("add reviews: "+ JSON.stringify(review));
      for (let i=0;i<state.games.length;i++){
       // console.log("testest: "+ state.games[i].id+ " "+ review.newReview.game_review);
        if (state.games[i].id == review.newReview.game_review){
          //state.games[i]['reviews'] = [];
          if (!state.games[i]['reviews'])
            state.games[i]['reviews'] = [];
          state.games[i]['reviews'].push(review.newReview);
          console.log("naso game addreview");
          console.log(JSON.stringify(state.games[i]));
        }
      }
    }
  },
  actions: {
    
    login: function({ commit }, obj){
      fetch('http://127.0.0.1:8090/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj)
      }).then(res => res.json())
        .then(tkn => {
          if (tkn.msg){
            alert(tkn.msg);
            return tkn.msg;
          } else {
            commit('setToken', tkn.token);
          }
        });
    },
    logout: function({ commit }){
      let e = []
      localStorage.setItem("gamesInCart", JSON.stringify(e));
      commit('setGamesInCart');
     // console.log(JSON.parse(localStorage.getItem("gamesInCart") || "[]"));
      commit('setToken', '');
    },
    register: function({ commit }, obj){
      fetch('http://127.0.0.1:8090/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj)
      }).then(res => res.json())
        .then(tkn => {
          if (tkn.msg){
            alert(tkn.msg);
            return;
          } else {
            commit('setToken', tkn.token);
          }
        });
    },
    fetchGames: function({commit}){
      fetch('http://127.0.0.1:8090/admin/games')
        .then(obj => obj.json())
        .then( data => {
          if (data.msg){
            alert(data.msg);
            return;
          }
          data.forEach( el => {
            fetch('http://127.0.0.1:8090/admin/publishers/'+el.publisher_game)
              .then(res => res.json())
              .then(data2 => {
                if (data2.msg){
                  alert(data2.msg);
                  return;
                }
                el.publisherName = data2.name;
              });
              fetch('http://127.0.0.1:8090/admin/categories/'+el.category_game)
              .then(res => res.json())
              .then(data3 => {
                if (data3.msg){
                  alert(data3.msg);
                  return;
                }
                el.categoryType = data3.type;
              });
              fetch('http://127.0.0.1:8090/admin/reviews/game/'+el.id)
              .then(res => res.json())
              .then(data4 => {
                if (data4.msg){
                  alert(data4.msg);
                  return;
                }
                //console.log("radim fetch za reviews iz fetchGames()");
                let numOfReviews = 0;
                let revGrade = 0;
                data4.forEach(r => {
                  numOfReviews+=1;
                  revGrade+=r.rating;
                  fetch(`http://127.0.0.1:8090/admin/users/${r.user_review}`)
                    .then(res2=>res2.json())
                    .then(u => {
                      //console.log("SETOVAO USERNAME ZA REVIEW: "+u.username);
                      r.username=u.username;
                    });
                });
                el.numberOfReviews = numOfReviews;
                if (numOfReviews == 0){
                  el.overall = 0;
                } else
                  el.overall = parseFloat(revGrade/numOfReviews).toFixed(2);
                el['reviews'] = data4;
              });
            commit('addGame', el);
          });
          commit('setGames', data);
        });
    },
    fetchCategories: function({commit}){
      fetch('http://127.0.0.1:8090/admin/categories')
        .then(obj => obj.json())
        .then( data => {
          if (data.msg){
            alert(data.msg);
            return;
          }
          data.forEach( el => {
            //commit('addCategory', el);
            fetch(`http://127.0.0.1:8090/admin/games/category/${el.id}`)
              .then(res => res.json())
              .then(data2 => {
                if (data2.msg){
                  alert(data2.msg);
                  return;
                }
               // console.log("Fetch za category games. "+JSON.stringify(data2));
                el.games = data2;
                console.log("radi komit za : "+ JSON.stringify(el));
                commit('addCategory', el);
                data2.forEach( d => {
                //  console.log("Dodao u games: "+JSON.stringify(d));
                });
              });
              
          });
          //commit('setCategories', data);
        });
    },
    fetchPublishers: function({commit}){
      fetch('http://127.0.0.1:8090/admin/publishers')
        .then(obj => obj.json())
        .then( data => {
          if (data.msg){
            alert(data.msg);
            return;
          }
          data.forEach( el => {
            fetch(`http://127.0.0.1:8090/admin/games/publisher/${el.id}`)
              .then(res => res.json())
              .then(data2 => {
                if (data2.msg){
                  alert(data2.msg);
                  return;
                }
               // console.log("Fetch za publisher games. "+JSON.stringify(data2));
                el['games'] = data2;
                data2.forEach( d => {
                //  console.log("Dodao u games: "+JSON.stringify(d));
                });
              });
              commit('addPublisher', el);
          });
          //commit('setPublishers', data);
        });
    },
    socket_review({ commit }, rev) {
      const newReview = JSON.parse(rev);
      console.log("SOCKET_REVIEW: "+JSON.stringify(newReview));
      commit('addReview', { newReview });
    },
    async getGame({ commit, state }, id) {
      return new Promise( (resolve, reject) => {
        for (let i=0;i<state.games.length;i++){
          if (state.games[i].id == id){
            console.log("resolved game in getgame");
            resolve(state.games[i]);
            return;
          }
        }
        const g = state.games.filter(gm => gm.id == id)[0];
        if (g) {
          resolve(g);
        } else {
          //ukoliko game nije u games:
          fetch(`http://127.0.0.1:8090/admin/games/${id}`)
            .then(res => res.json())
            .then(data => {
              if (data.msg){
                alert(data.msg);
                return;
              }
              fetch('http://127.0.0.1:8090/admin/publishers/'+data.publisher_game)
              .then(res => res.json())
              .then(data2 => {
                if (data2.msg){
                  alert(data2.msg);
                  return;
                }
                data.publisherName = data2.name;
              });
              fetch('http://127.0.0.1:8090/admin/categories/'+data.category_game)
              .then(res => res.json())
              .then(data3 => {
                if (data3.msg){
                  alert(data3.msg);
                  return;
                }
                data.categoryType = data3.type;
              });
              fetch('http://127.0.0.1:8090/admin/reviews/game/'+data.id)
              .then(res => res.json())
              .then(data4 => {
                if (data4.msg){
                  alert(data4.msg);
                  return;
                }
                var numOfReviews = 0;
                data4.forEach(el => {
                  numOfReviews+=1;
                 fetch(`http://127.0.0.1:8090/admin/users/${el.user_review}`)
                  .then( res => res.json())
                  .then( userData => { 
                    data4[numOfReviews-1].username = userData.username;
                  });
                });
                data.numberOfReviews = numOfReviews;
                data['reviews'] = data4;
                commit('addGame', data);
                resolve(data);
              });
            });
        }
      });
    },
    getPublisher({ commit, state }, id){
      return new Promise((resolve, reject) => {
        const p = state.publishers.filter(pub => pub.id == id)[0];
        if (p){
          console.log("resolved publisher");
          resolve(p);
        } else {
          fetch(`http://127.0.0.1:8090/admin/publishers/${id}`)
        .then(obj => obj.json())
        .then( data => {
          if (data.msg){
            alert(data.msg);
            return;
          }
          fetch(`http://127.0.0.1:8090/admin/games/publisher/${data.id}`)
            .then(res => res.json())
            .then(data2 => {
              if (data2.msg){
                alert(data2.msg);
                return;
              }
              data['games'] = data2;
            });
            commit('addPublisher', data);
            resolve(data);
        });
        }
      });
    },
    getCategory({commit, state}, id){
      return new Promise((resolve, reject) => {
        const c = state.categories.filter( ctg => ctg.id == id)[0];
        if (c){
          console.log("resolved category-----------");
          resolve(c);
        } else {
          fetch(`http://127.0.0.1:8090/admin/categories/${id}`)
            .then(obj => obj.json())
            .then(data => {
              if (data.msg){
                alert(data.msg);
                return;
              }
              fetch(`http://127.0.0.1:8090/admin/games/category/${data.id}`)
                .then(res=>res.json())
                .then(data2 => {
                  data['games'] = data2;
                });
                commit('addCategory', data);
                resolve(data);
            });
        }
      });
    },
    getCart: function({ commit, state }, user){ 
      //console.log("POZVAN GETCART");
      console.log("Token: "+state.token);
        return new Promise(( resolve, reject ) => {
          fetch(`http://127.0.0.1:8090/admin/cart/user/${user.usersId}`,{
            method: 'GET',
            headers: {'Authorization': `Bearer ${state.token}`}
          })
          .then(res => res.json())
          .then(datas => {
            let lastCart = null;
            datas.forEach( cdata => {
                lastCart = cdata;
            });
            lastCart['games'] = [];
           // console.log("Found last cart with id: "+ JSON.stringify(lastCart));
            //fetch da dohvati sve item-e iz lastCart-a
            fetch(`http://127.0.0.1:8090/admin/item/cart/${lastCart.id}`,{
              method: 'GET',
              headers: {'Authorization': `Bearer ${state.token}`}
            })
              .then( res => res.json())
              .then( datass => {
                datass.forEach( idata => {
                  //fetch za game iz SVAKOG ITEMA!
                  fetch(`http://127.0.0.1:8090/admin/games/${idata.game_item}`,{
                    method: 'GET',
                    headers: {'Authorization': `Bearer ${state.token}`}
                  })
                    .then( res => res.json())
                    .then(datasss => {
                      lastCart['games'].push(datasss);
                    });
                });
              });
            //  console.log("lastCart: "+ JSON.stringify(lastCart));
              commit('setCurrCart', lastCart);
              resolve(lastCart);
          });
        });     
  },
  addGameToCart: function({dispatch, state}, asdf){
    //od game-a se pravi item koji ce da ima game_item i cart_item setovan,
    const cart = asdf.cart;
    const game = asdf.game;
    const user = asdf.user;
    game['reviews'] = [];
    const itemBody = {
      game_item: game.id,
      cart_item: cart.id,
      game: game.title,
      price: game.price
    };
    //console.log("napravljen item: "+ JSON.stringify(itemBody));
    fetch(`http://127.0.0.1:8090/admin/item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify(itemBody)
    })
      .then( res => res.json() )
      .then(data => {
        if (data.msg){
          //console.log(data.msg + "GRESKA");
          return;
        }
        dispatch('getCart',user);
      });
    return;
  },
  removeGameFromCart: function({dispatch,state}, objInfo){
    const cart = objInfo.cart;
    const game = objInfo.game;
    const user = objInfo.user;
    fetch(`http://127.0.0.1:8090/admin/item/gamecart/${game.id}/${cart.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${state.token}`
      }
    }).then( res => res.json())
      .then(data => {
        if (data.msg){
          alert(data.msg);
          return;
        }
        //console.log("removed from cart.");
        dispatch('getCart', user);
      })
  },
  getWishlist({commit, state}, user){
   // console.log("POZVAN GETWISHLIST");

    return new Promise(( resolve, reject ) => {
      fetch(`http://127.0.0.1:8090/admin/wishlist/user/${user.usersId}`, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${state.token}`}
      })
        .then( res => res.json())
        .then( wlData => {
          commit('setCurrWishlist', wlData);
          resolve(wlData);
        });
    });
  },
  addGameToWL: function({dispatch, state}, obj){
    const game = obj.game;
    const user = obj.user;
    const wlBody = {
      user_wishlist: user.usersId,
      game_wishlist: game.id,
      title: game.title,
      price: game.price
    }
    //console.log("wlBody "+JSON.stringify(wlBody));
    fetch(`http://127.0.0.1:8090/admin/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify(wlBody)
    }).then( res => res.json())
      .then(data => {
        if (data.msg){
        // console.log(data.msg);
          return;
        }
        dispatch('getWishlist', user);
      });
  },
  removeGameFromWL: function({dispatch, state}, obj){
    //to be done
    const user = obj.user;
    const game = obj.game;
    fetch(`http://127.0.0.1:8090/admin/wishlist/user/${user.usersId}`, {
      method: 'GET',
      headers: {'Authorization': `Bearer ${state.token}`}
    })
      .then( res => res.json())
      .then(wlData => {
        wlData.forEach( wl => {
          if (wl.title === game.title){
           // console.log("Found one for removal?");
            fetch(`http://127.0.0.1:8090/admin/wishlist/${wl.id}`, {
              method: 'DELETE',
              headers: {'Authorization': `Bearer ${state.token}`}
            }).then( res => res.json())
              .then( data => {
                if (data.msg){
                  console.log(data.msg);
                  return;
                }
              //  console.log("Removed game.");
                dispatch('getWishlist', user);
              });
              return;
          }
        })
      });
  },
  search({ commit }, q){
  //  console.log("trazim: "+q);
    return new Promise(( resolve, reject ) => {
      fetch(`http://127.0.0.1:8090/admin/games`)
        .then( res => res.json() )
        .then( gameData => {
          let results = [];
          gameData.forEach( game => {
            if (game.title.toLowerCase().includes( q.toLowerCase() )){
              results.push(game);
              console.log("naso game sa odredjenim podstringom.");
            }
          });
          commit('setSearchResults', results);
          resolve(results);
        });
    });
  },
  getReceipts: function({commit, state}, user){
  //  console.log("pozvan getReceipts");
    return new Promise((resolve, reject) => {
      fetch(`http://127.0.0.1:8090/admin/receipts/user/${user.usersId}`, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${state.token}`}
      })
        .then( res => res.json())
        .then( recData => {
          commit('setCurrReceipts', recData);
        });
    });
  },
  addReceipt: function({dispatch, commit, state}, obj){
    //dodaj receipt ali izbrisi sve iteme iz trenutnog cart-a
    const cart = obj.cart;
    const user = obj.user;
    const rcpt = {
      user_receipt: user.usersId,
      cart_receipt: cart.id,
      total: cart.to_pay
    }
   // console.log("proba da se doda receipt: "+ JSON.stringify(rcpt));
    fetch(`http://127.0.0.1:8090/admin/receipts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify(rcpt)
    }).then( res => res.json())
      .then( data => {
        if (data.msg){
          console.log(data.msg);
          return;
        }
     //   console.log("uspesno kreiran receipt");
        fetch(`http://127.0.0.1:8090/admin/item`, {
          method: 'GET',
          headers: {'Authorization': `Bearer ${state.token}`}
        })
          .then(res => res.json())
          .then( items => {
            items.forEach( item => {
              if (item.cart_item == cart.id){
                fetch(`http://127.0.0.1:8090/admin/item/${item.id}`, {
                  method: 'DELETE',
                  headers: {'Authorization': `Bearer ${token}`}
                }).then( res => res.json())
                  .then( itemData => {
                    if (itemData.msg){
                    //  console.log(itemData.msg);
                      return;
                    }
                //    console.log("izbrisan item zbog receipt-a");
                  });
              }
            });
          });
        dispatch('getReceipts', user);
      });
  }
  

  },
  modules: {
  }
})

/*
  search logika: 
  search({ commit }, q) {
      return new Promise( (resolve, reject) => {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${q}`)
          .then( obj => obj.json() )
          .then( res => {
            commit('setImageIDs', res.objectIDs);
            resolve(res.total);
          });
      });
    },
*/
/*return new Promise((resolve, reject) => {
        console.log("POZVAN GETCART");
        fetch(`http://127.0.0.1:8090/admin/cart/user/${id}`)
        .then(res=>res.json())
        .then(data => {
          if (data.msg){
            alert(data.msg);
            return;
          }
          var finalCart = null;
          data.forEach( cart => {
            finalCart = cart;
            finalCart.properID = cart.id;
          });
          finalCart.finalPrice = 0;
          finalCart['cartGames'] = [];
          fetch(`http://127.0.0.1:8090/admin/item/cart/${finalCart.id}`)
            .then(res=>res.json())
            .then(data2 => {
              if (data2.msg){
                alert(data2.msg);
                return;
              }
              data2.forEach( item => {
                //console.log("uso u for each za items: "+JSON.stringify(item));
                fetch(`http://127.0.0.1:8090/admin/games/${item.game_item}`)
                  .then(res=>res.json())
                  .then(data3 => {
                    //console.log("uso u fetch za games: "+ JSON.stringify(data3));
                    //item.game = data3;
                    item.title = data3.title;
                    //item.game = data3;
                    //console.log("ispis itema: "+JSON.stringify(item));
                    finalCart['cartGames'].push(item.game);
                    finalCart.finalPrice += data3.price;
                  });
              });
              finalCart['items'] = data2;
             // console.log("cartGames: "+JSON.stringify(finalCart['cartGames']));
              commit('setCart', finalCart);
              commit('setCartID', finalCart.id);
              resolve(finalCart);
             // finalCart.items = data2;
            });
            //console.log("Cart koji je dohvatio: " +JSON.stringify(finalCart));
            
        });
      });*/

/* PREVIOUS WISHLIST METHODS: 
      addGameToWL({ state },game){
    //console.log(JSON.stringify(game));
    fetch('http://127.0.0.1:8090/admin/wishlist',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(game)
    }).then(res => res.json())
      .then(data => {
        if (data.msg){
          alert(JSON.stringify(data.msg));
          return;
        }
        //console.log(JSON.stringify(data));
        data['games'] = [];
        fetch(`http://127.0.0.1:8090/admin/wishlist/user/${game.user_wishlist}`)
          .then(obj=>obj.json())
          .then(data2=>{
            if (data2.msg){
              alert(data2.msg);
              return;
            }
            //commit('setWishlist', data2);
            data2.forEach( el => {
              fetch(`http://127.0.0.1:8090/admin/games/${el.game_wishlist}`)
                .then(res=>res.json())
                .then(data3 => {
                  data['games'].push(data3);
                });
            });
            data['user'] = game.user_wishlist;
            commit('setWishlist', data);
          });
      });
  },
  getWishlist({ commit, state}, id){
    return new Promise((resolve, reject) => {
      if (state.wishlist.games !== undefined){
        console.log("wl u if: "+ JSON.stringify(state.wishlist['games']));
        resolve(state.wishlist);
      } else {
        fetch(`http://127.0.0.1:8090/admin/wishlist/user/${id}`)
          .then(res => res.json())
          .then( data => {
            data['games'] = [];
            data.forEach( el => {
              fetch(`http://127.0.0.1:8090/admin/games/${el.game_wishlist}`)
                .then(obj => obj.json())
                .then( gg => {
                  data['games'].push(gg);
                  commit('addWishlist', el);
                });
            });
            data.user = id;
            commit('setWishlist', data);
            resolve(data);
          }); 
      }
    });
  },
  removeFromWishlist({commit, state}, game, user){
    console.log("trying to remove: "+JSON.stringify(game));
    const ww = state.wishlist.games.filter( p => p.id != game.id);
    console.log("after removal: "+JSON.stringify(ww));
    commit('setWishlist', ww);
    console.log("state: "+JSON.stringify(state.wishlist));
  }
*/
