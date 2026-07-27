import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/authService";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import {
  uploadProfileImage,
  uploadResume
} from "../services/authService";
import {
  FaUserCircle,
  FaEnvelope,
  FaUserTag,
  FaPhone,
  FaMapMarkerAlt,
  FaPen,
} from "react-icons/fa";

function Profile() {
  const { user, updateUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
  name: "",
  phone: "",
  location: "",
  bio: "",
  github: "",
  linkedin: "",
  portfolio: "",
  skills: "",
  education: [
    {
      school: "",
      degree: "",
      year: "",
    },
  ],
  experience: [
    {
      company: "",
      role: "",
      duration: "",
    },
  ],
});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);
  const handleImageChange = (e) => {
  setSelectedImage(e.target.files[0]);
};
const handleResumeChange = (e) => {
  setSelectedResume(e.target.files[0]);
};
const handleResumeUpload = async () => {

  if (!selectedResume) {
    toast.error("Please select a resume.");
    return;
  }

  try {

    const data = await uploadResume(selectedResume);

    updateUser(data.user);

    toast.success("Resume uploaded successfully!");

    setSelectedResume(null);

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Resume upload failed"
    );

  }
};
const handleImageUpload = async () => {
  if (!selectedImage) {
    toast.error("Please select an image.");
    return;
  }

  try {
   const data = await uploadProfileImage(selectedImage);

updateUser(data.user);

toast.success("Profile picture updated!");

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Upload failed"
    );
  }
};
const handleEducationChange = (index, e) => {
  const updated = [...formData.education];
  updated[index][e.target.name] = e.target.value;

  setFormData({
    ...formData,
    education: updated,
  });
};

const handleExperienceChange = (index, e) => {
  const updated = [...formData.experience];
  updated[index][e.target.name] = e.target.value;

  setFormData({
    ...formData,
    experience: updated,
  });
};
const addEducation = () => {
  setFormData({
    ...formData,
    education: [
      ...formData.education,
      {
        school: "",
        degree: "",
        year: "",
      },
    ],
  });
};

const addExperience = () => {
  setFormData({
    ...formData,
    experience: [
      ...formData.experience,
      {
        company: "",
        role: "",
        duration: "",
      },
    ],
  });
};
const removeEducation = (index) => {
  const updated = [...formData.education];
  updated.splice(index, 1);

  setFormData({
    ...formData,
    education: updated,
  });
};

const removeExperience = (index) => {
  const updated = [...formData.experience];
  updated.splice(index, 1);

  setFormData({
    ...formData,
    experience: updated,
  });
};
 useEffect(() => {

  if (user) {

    setFormData({
      name: user.name || "",
      phone: user.phone || "",
      location: user.location || "",
      bio: user.bio || "",

      github: user.github || "",
      linkedin: user.linkedin || "",
      portfolio: user.portfolio || "",

      skills: Array.isArray(user.skills)
        ? user.skills.join(", ")
        : "",


      education:
        user.education?.length > 0
          ? user.education
          : [
              {
                school: "",
                degree: "",
                year: "",
              },
            ],


      experience:
        user.experience?.length > 0
          ? user.experience
          : [
              {
                company: "",
                role: "",
                duration: "",
              },
            ],
    });

  }

}, [user]);

const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const updatedData = {
  ...formData,
  skills: formData.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean),
};

const data = await updateProfile(updatedData);

updateUser(data.user); // if your AuthContext has this

toast.success("Profile updated successfully!");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };
console.log(user);
console.log("Profile image:", user?.profileImage);
  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.card}>
          {/* Header */}
         <div style={styles.header}>
  <div style={{ textAlign: "center" }}>
    {user?.profileImage ? (
      <img
        src={`http://localhost:5000${user.profileImage}`}
        alt="Profile"
        style={styles.image}
      />
    ) : (
      <FaUserCircle size={120} color="#fff" />
    )}

    <br />
    <br />

    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
    />

    <br />
    <br />

    <button
      type="button"
      onClick={handleImageUpload}
      style={{
        background: "#fff",
        color: "#2563eb",
        border: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Upload Photo
    </button>

    <h2 style={{ marginTop: "20px" }}>{user?.name}</h2>

    <p>{user?.role?.toUpperCase()}</p>
  </div>
</div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={styles.body}
          >
            <div style={styles.group}>
              <label>
                <FaPen /> Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.group}>
              <label>
                <FaEnvelope /> Email
              </label>

              <input
                type="email"
                value={user?.email}
                disabled
                style={{
                  ...styles.input,
                  background: "#f5f5f5",
                }}
              />
            </div>

            <div style={styles.group}>
              <label>
                <FaUserTag /> Role
              </label>

              <input
                type="text"
                value={user?.role}
                disabled
                style={{
                  ...styles.input,
                  background: "#f5f5f5",
                }}
              />
            </div>

            <div style={styles.group}>
              <label>
                <FaPhone /> Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter phone number"
              />
            </div>

            <div style={styles.group}>
              <label>
                <FaMapMarkerAlt /> Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter location"
              />
            </div>

            <div style={styles.group}>
              <label>Bio</label>

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={5}
                style={styles.textarea}
                placeholder="Tell us about yourself..."
              />
            </div>
            <div style={styles.group}>
  <label>GitHub</label>

  <input
    type="text"
    name="github"
    value={formData.github}
    onChange={handleChange}
    style={styles.input}
    placeholder="https://github.com/username"
  />
</div>
<div style={styles.group}>
  <label>LinkedIn</label>

  <input
    type="text"
    name="linkedin"
    value={formData.linkedin}
    onChange={handleChange}
    style={styles.input}
    placeholder="https://linkedin.com/in/username"
  />
</div>
<div style={styles.group}>
  <label>Portfolio</label>

  <input
    type="text"
    name="portfolio"
    value={formData.portfolio}
    onChange={handleChange}
    style={styles.input}
    placeholder="https://yourportfolio.com"
  />
</div>
<div style={styles.group}>
  <label>Skills</label>

  <input
    type="text"
    name="skills"
    value={formData.skills}
    onChange={handleChange}
    style={styles.input}
    placeholder="React, Node.js, MongoDB, Express"
  />

  <small>
    Separate each skill with a comma.
  </small>
</div>
<h3>Education</h3>

{formData.education.map((edu, index) => (
  <div key={index} style={{ marginBottom: "20px" }}>
    <input
  type="text"
  name="school"
  value={edu.school}
  onChange={(e) => handleEducationChange(index, e)}
  style={styles.input}
/>

   <input
  type="text"
  name="degree"
  value={edu.degree}
  onChange={(e) => handleEducationChange(index, e)}
  style={styles.input}
/>

<input
  type="text"
  name="year"
  value={edu.year}
  onChange={(e) => handleEducationChange(index, e)}
  style={styles.input}
/>

{formData.education.length > 1 && (
  <button
    type="button"
    onClick={() => removeEducation(index)}
    style={styles.removeButton}
  >
    Remove
  </button>
)}
  </div>
))}
<button
  type="button"
  onClick={addEducation}
  style={styles.secondaryButton}
>
  + Add Education
</button>
<h3>Experience</h3>

{formData.experience.map((exp, index) => (
  <div key={index} style={{ marginBottom: "20px" }}>
   <input
  type="text"
  name="company"
  placeholder="Company"
  value={exp.company}
  onChange={(e) => handleExperienceChange(index, e)}
  style={styles.input}
/>

    <input
      type="text"
      name="role"
      placeholder="Role"
      value={exp.role}
      onChange={(e) => handleExperienceChange(index, e)}
      style={styles.input}
    />

    <input
      type="text"
      name="duration"
      placeholder="Duration"
      value={exp.duration}
      onChange={(e) => handleExperienceChange(index, e)}
  style={styles.input}
    />
   
<button
  type="button"
  onClick={() => removeExperience(index)}
  style={styles.removeButton}
>
  Remove Experience
</button>
  </div>
))}
 <button
  type="button"
  onClick={addExperience}
  style={styles.secondaryButton}
>
  + Add Experience
</button>
<div style={styles.group}>

<label>
  Upload Resume
</label>


<input
  type="file"
  accept=".pdf,.doc,.docx"
  onChange={handleResumeChange}
/>

{user?.resume && (
  <p>
    <a
      href={`http://localhost:5000${user.resume}`}
      target="_blank"
      rel="noreferrer"
    >
      View Current Resume
    </a>
  </p>
)}


<button
  type="button"
  onClick={handleResumeUpload}
  style={styles.button}
>
 Upload Resume
</button>

</div>

            <button
              type="submit"
              disabled={loading}
              style={styles.button}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    background: "#f4f6f9",
    minHeight: "100vh",
    padding: "40px 20px",
  },

  card: {
    maxWidth: "850px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },

  header: {
    background: "#2563eb",
    color: "#fff",
    textAlign: "center",
    padding: "40px",
  },

  image: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #fff",
    marginBottom: "15px",
  },

  body: {
    padding: "35px",
  },

  group: {
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "8px",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "8px",
    resize: "vertical",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  removeButton:{
    width: "author",
    padding: "14px",
    color: "red",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  secondaryButton:{
     width: "author",
    padding: "14px",
    color: "blue",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom:"15px",
  },
};

export default Profile;