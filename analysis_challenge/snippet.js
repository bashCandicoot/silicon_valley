exports​.​inviteUser​​ = ​​ function​ (​req​, ​​res​)​​ {​​
  var​​​ invitationBody​​ = ​​req​.​body​;​​
  var​​​ shopId​​ = ​​req​.​params​.​shopId​;​​
  var​​​ authUrl​​ = ​​"https://url.to.auth.system.com/invitation​"​;​

  superagent​​​​.​post​(​authUrl​)​​​​.​send​(​invitationBody​)​​​​.​end​(​function​ (​err​, ​​invitationResponse​)​​ {​​​​​​
    if​​​ (​invitationResponse​.​status​​ === ​​​201​)​​ {​​​​​​​​
      User​.​findOneAndUpdate​({​​​​​​​​​​
        authId​: ​​invitationResponse​.​body​.​authId​​​​​​​​
      }, ​​​ {​​​​​​​​​​
        authId​: ​​invitationResponse​.​body​.​authId​,
        ​​​​​​​​​​email​: ​​invitationBody​.​email​​​​​​​​
      }, ​​​ {​​​​​​​​​​
        upsert​: ​​true​,
        ​​​​​​​​​​new​: ​​true​​​​​​​​
      }, ​​​function​ (​err​, ​​createdUser​)​​ {​​​​​​​​​​
        Shop​.​findById​(​shopId​).​exec​(​function​ (​err​, ​​shop​)​​ {​​​​​​​​​​​​
          if​​​ (​err​​ || ​​​!​shop​)​​ {​​​​​​​​​​​​​​
            return​​​ res​.​status​(​500​).​send​(​err​​ || ​​​{​​
              message​: 'No​ shop​ found'​​​
            });​​​​​​​​​​​​
          }​​​​​​​​​​​​
          if​​​ (​shop​.​invitations​.​indexOf​(​invitationResponse​.​body​.​invitationId​))​​​ {​​​​​​​​​​​​​​
            shop​.​invitations​.​push​(​invitationResponse​.​body​.​invitationId​);​​​​​​​​​​​​
          }​​​​​​​​​​​​
          if​​​ (​shop​.​users​.​indexOf​(​createdUser​.​_id​)​​ === ​​​-​1​)​​ {​​​​​​​​​​​​​​
            shop​.​users​.​push​(​createdUser​);​​​​​​​​​​​​
          }​​​​​​​​​​​​
          shop​.​save​();​​​​​​​​​​
        });​​​​​​​​
      });​​​​​​
    }​​
    else​​​
      if​​​ (​invitationResponse​.​status​​ === ​​​200​)​​ {​​​​​​​​
        res​.​status​(​400​).​json​({​​​​​​​​​​
          error​: ​​true​,
          ​​​​​​​​​​message​: 'User​ already​ invited​ to​ this​ shop'​​​​​​​​
        });​​​​​​​​
        return​;​​​​​​
      }​​​​​​
    res​.​json​(​invitationResponse​);​​​​
  });
};

// The if statement on line 23 doesn't quite make sense.
// if indexOf finds the id it returns an integer relating to its position, otherwise it returns -1.
// so we can be accidentally pushing duplicate invitationId's into the array here.

// There isn't any error handling if the invitationResponse is anything other than 200 or 201.

// I would break the code up into smaller well named functions first. This way I am 
// documenting the code, making it reusable, and allowing easier unit testing at the same time.
// As it stands, there are three main things happening; finding and updating the User, 
// finding and updating the shop's invitations/users, and what to do if the
// invitationResponse is 200. I'd break these parts of the program into seperate smaller functions.