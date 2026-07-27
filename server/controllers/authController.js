const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendEmail } = require("../utils/emailService");
// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
       message: "Login successful",
      token,
      user: {
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,

  resume:user.resume,
  profileImage:user.profileImage,

  phone:user.phone,
  location:user.location,
  bio:user.bio,

  github:user.github,
  linkedin:user.linkedin,
  portfolio:user.portfolio,

  skills:user.skills,
  education:user.education,
  experience:user.experience,
},
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get logged-in user's profile
const getMe = async (req,res)=>{
  try{

    res.status(200).json({

      id:req.user._id,

      name:req.user.name,

      email:req.user.email,

      role:req.user.role,


      resume:req.user.resume,

      profileImage:req.user.profileImage,


      phone:req.user.phone,

      location:req.user.location,

      bio:req.user.bio,


      github:req.user.github,

      linkedin:req.user.linkedin,

      portfolio:req.user.portfolio,


      skills:req.user.skills,


      education:req.user.education,


      experience:req.user.experience,

    });


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }


    // Basic information
    if (req.body.name !== undefined) user.name = req.body.name;
    if (req.body.phone !== undefined) user.phone = req.body.phone;
    if (req.body.location !== undefined) user.location = req.body.location;
    if (req.body.bio !== undefined) user.bio = req.body.bio;


    // Social links
    if (req.body.github !== undefined) user.github = req.body.github;
    if (req.body.linkedin !== undefined) user.linkedin = req.body.linkedin;
    if (req.body.portfolio !== undefined) user.portfolio = req.body.portfolio;


    // Skills
    if (req.body.skills) {
      user.skills = req.body.skills;
    }


    // Education
    if (req.body.education) {
      user.education = req.body.education;
    }


    // Experience
    if (req.body.experience) {
      user.experience = req.body.experience;
    }


    // Profile image
    if (req.body.profileImage) {
      user.profileImage = req.body.profileImage;
    }


    // Resume
    if (req.body.resume) {
      user.resume = req.body.resume;
    }


    await user.save();


    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });


  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const uploadProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image",
      });
    }

    user.profileImage = `/uploads/profile-images/${req.file.filename}`;

    await user.save();

    res.status(200).json({
      message: "Profile image uploaded successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const uploadResume = async (req,res)=>{

  try {

    const user = await User.findById(req.user._id);


    if(!user){
      return res.status(404).json({
        message:"User not found"
      });
    }


    if(!req.file){
      return res.status(400).json({
        message:"Please upload a resume"
      });
    }


    user.resume = `/uploads/resumes/${req.file.filename}`;


    await user.save();


    res.status(200).json({
        message: "Resume uploaded successfully",
        user,
      });


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};
// PASSWORD RESET REQUEST
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account found with that email.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token before saving to database
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save hashed token and expiry (15 minutes)
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 15 * 60 * 1000;

    // Skip validation when saving
    await user.save({ validateBeforeSave: false });

    // Frontend reset link (contains ORIGINAL token)
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    // Send email
    await sendEmail({
      to: user.email,
      subject: "Reset Your Password",
      html: `
        <div style="font-family:Arial,sans-serif;padding:30px;background:#f8fafc;">
          <div style="max-width:600px;margin:auto;background:white;border-radius:12px;padding:30px;border:1px solid #e5e7eb;">
            
            <h2 style="color:#2563eb;">
              Password Reset Request
            </h2>

            <p>Hello <strong>${user.name}</strong>,</p>

            <p>
              We received a request to reset the password for your Job Application Tracker account.
            </p>

            <p>
              Click the button below to create a new password.
            </p>

            <p style="text-align:center;margin:35px 0;">
              <a
                href="${resetLink}"
                style="
                  background:#2563eb;
                  color:white;
                  text-decoration:none;
                  padding:14px 28px;
                  border-radius:8px;
                  font-weight:bold;
                  display:inline-block;
                "
              >
                Reset Password
              </a>
            </p>

            <p>
              This link will expire in
              <strong>15 minutes</strong>.
            </p>

            <p>
              If you didn't request a password reset,
              you can safely ignore this email.
            </p>

            <hr>

            <small style="color:#6b7280;">
              Job Application Tracker
            </small>

          </div>
        </div>
      `,
    });

    res.status(200).json({
      message: "Password reset email sent successfully.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    // Hash token received from URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    // Find matching user
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token.",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    // Clear reset fields
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successfully.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  uploadProfileImage,
  uploadResume,
  forgotPassword,
  resetPassword,
};