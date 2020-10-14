const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
})

const SALT = process.env.SALT;

const User = require("../models/users.model");
const Post = require("../models/posts.model");
const protect = require("../middleware/protect");

route.post("/comment", protect, (req, res) => {
  const newComment = {
    comment: req.body.comment,
    commentedBy: req.user.data._id,
  };
  Post.findOneAndUpdate(
    { _id: req.body.id },
    { $push: { comments: newComment } },
    { new: true }
  )
    .populate(
      "by comments.commentedBy",
      " -followings -password -posts -saved -name -createdAt -updatedAt"
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
    });
});
route.post("/user", protect, (req, res) => {
  User.findOne({ username: req.body.username })
    .populate("posts")
    .then((data) => res.json(data))
    .catch((err) => {
    });
});
route.post("/", protect, (req, res) => {
  User.find({username : req.user.data.username}).select("followings").then(rdata => {
    
Post.find({by : {$in : [...rdata[0].followings,req.user.data._id]}})
    .sort({ createdAt: -1 })
    .skip(req.body.skip)
    .limit(4)
    .populate(
      "by comments.commentedBy",
      "-followings -followings -password -posts -saved -name -createdAt -updatedAt"
    )
    .then((data) => res.json(data))
    .catch();
  }).catch(err => {
    return
  })
  
});
route.post("/signup", (req, res) => {
  
  const { name, username, password, profilePicture } = req.body;
   if (!name || !username || !password) {
    return res.sendStatus(400);
  }
  if (profilePicture == "https://res.cloudinary.com/instaclone1812/image/upload/v1600344194/no_pic_ugagm7.png")
{
  const profilePic = profilePicture
 User.findOne({ username }, (err, data) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (data) {
      
      return res.status(200).json({ err: "Username Not Available" });
    } else {
      const user = new User({
        name,
        username,
        password,
        profilePic,
      });
      user
        .save()
        .then((msg) => {
          
          res.sendStatus(200);
        })
        .catch((err) => {
          res.status(400).json({ err });
          
        });
    }
  });
return
}
 cloudinary.uploader.upload(profilePicture,(err,image) => {
    if (err)
    {
      return
    }
const profilePic = image.secure_url
 User.findOne({ username }, (err, data) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (data) {
     
      return res.status(200).json({ err: "Username Not Available" });
    } else {
      const user = new User({
        name,
        username,
        password,
        profilePic,
      });
      user
        .save()
        .then((msg) => {
         
          res.sendStatus(200);
        })
        .catch((err) => {
          res.status(400).json({ err });
          
        });
    }
  });
  })
 

 
});
route.post("/add", protect, (req, res) => {
  cloudinary.uploader.upload(req.body.picture,(err,image) => {
    if (err)
    {
      
      return
    }
    
    const {caption} = req.body
    const picture = image.secure_url
     const post = new Post({
    picture,
    caption,
    by: req.user.data,
  });
 post
    .save()
    .then((msg) => {
      
      User.findOneAndUpdate(
        { username: req.user.data.username },
        {
          $push: { posts: msg._id },
        },
        { new: true }
      )
        .then(() => {
      
          res.sendStatus(200);
        })
        .catch((err) => {
         
          res.sendStatus(500);
        });
    })
    .catch((err) => {
    
      res.sendStatus(500);
    });
    return
  })
});
route.post("/like", protect, (req, res) => {
 
  Post.findOneAndUpdate(
    { _id: req.body.id },
    {
      $push: { likes: req.user.data._id },
    },
    { new: true }
  )
    .populate(
      "by comments.commentedBy",
      " -followings -password -posts -saved -name -createdAt -updatedAt"
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
     
      res.sendStatus(500);
    });
});
route.post("/unlike", protect, (req, res) => {
 
  Post.findOneAndUpdate(
    { _id: req.body.id },
    {
      $pull: { likes: req.user.data._id },
    },
    { new: true }
  )
    .populate(
      "by comments.commentedBy",
      " -followings -password -posts -saved -name -createdAt -updatedAt"
    )
    .then((data) => {
     
      res.json(data);
    })
    .catch((err) => {
  
      res.sendStatus(500);
    });
});
route.get("/profile", protect, (req, res) => {
  User.findOne({ username: req.user.data.username })
    .populate("posts")
    .then((user_data) => {
      res.send(user_data);
    });

});
route.post("/signin", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.sendStatus(400);
  }
  User.findOne({ username }, (error, data) => {
    if (error) {
  
      return res.status(400).json(error);
    }

    if (!data) {
      return res.status(200).json({ error: "Invalid Username Or Password" });
    }
    if (data.password !== password) {
      return res.status(200).json({ error: "Invalid Username Or Password" });
    }
    const TOKEN = jwt.sign({ data }, SALT, { expiresIn: "20m" });
    res.status(200).json({ TOKEN, user: data });
  });
});
route.post("/follow", protect, (req, res) => {
  User.findOneAndUpdate(
    { username: req.user.data.username },
    { $push: { followings: req.body._id } },
    { new: true }
  )
    .then(() => {
      User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { followers: req.user.data._id } },
        { new: true }
      )
        .populate("posts")
        .then((data) => res.json(data))
        .catch((err) => {
         
        });
    })
    .catch((err) => {
    
    });
});
route.post("/unfollow", protect, (req, res) => {

  User.findOneAndUpdate(
    { username: req.user.data.username },
    { $pull: { followings: req.body._id } },
    { new: true }
  )
    .then(() => {
      User.findOneAndUpdate(
        { username: req.body.username },
        { $pull: { followers: req.user.data._id } },
        { new: true }
      )
        .populate("posts")
        .then((data) => res.json(data))
        .catch((err) => {
          
        });
    })
    .catch((err) => {
     
    });
});
route.post("/data", protect, (req, res) => {
  Post.findOne({ _id: req.body.id })
    .populate(
      "by comments.commentedBy",
      "-createdAt -updatedAt   -followings -name -password -posts -saved"
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
    });
});
route.post("/explore", protect, (req, res) => {
  Post.find()

    .select("picture _id")
    .then((data) => res.json(data))
    .catch();
});
route.post("/search", (req, res) => {
  User.find({ username: { $regex: req.body.text, $options: "i" } })
    .select("username profilePic")

    .then((data) => res.json(data))
    .catch((err) => {
    });
});
route.post("/temp", (req, res) => {
  const { following } = req.body;
  const newData = following[0].split(",");

  Post.find({ by: { $in: newData } })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
    });
});
route.post("/save",protect,(req,res) => {
  const {username} = req.user.data
  const {id} = req.body

  User.findOneAndUpdate({username},{$push : {saved: id}},{new:true}).then(data => {
    res.json(data)
  }).catch(err => {
  return
  })
})
route.post('/followers',protect,(req,res) => {
  const {username} = req.body
  User.find({username},'followers').populate("followers")
  .then(data => {
    let mainData = []
    data[0].followers.map(item => {
      mainData.push({
        username: item.username,
        profilePic:item.profilePic
      })
    })
    res.json(mainData)
    
  }).catch(err => {
    res.sendStatus(400)
  
})})
route.post('/followings',(req,res) => {
  const {username} = req.body
  User.find({username},'followings').populate("followings")
  .then(data => {
    let mainData = []
    data[0].followings.map(item => {
      mainData.push({
        username: item.username,
        profilePic:item.profilePic
      })
    })
    res.json(mainData)
    
  }).catch(err => {
    res.sendStatus(400)
  
})})

module.exports = route;
