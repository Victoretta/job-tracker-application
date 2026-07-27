function JobForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
  editingJobId,
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        marginBottom: "30px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        {editingJobId ? "Update Job" : "Create New Job"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={styles.grid}>
          {/* Company */}
          <div>
            <label>Company *</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Company Logo */}
          <div>
            <label>Company Logo</label>

            <input
              type="file"
              name="companyLogo"
              accept="image/*"
              onChange={handleChange}
              style={styles.input}
            />

            {formData.companyLogo && (
              <img
                src={URL.createObjectURL(formData.companyLogo)}
                alt="Preview"
                style={styles.preview}
              />
            )}
          </div>

          {/* Position */}
          <div>
            <label>Position *</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label>Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* Salary */}
          <div>
            <label>Minimum Salary</label>
            <input
              type="number"
              name="salaryMin"
              value={formData.salaryMin}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div>
            <label>Maximum Salary</label>
            <input
              type="number"
              name="salaryMax"
              value={formData.salaryMax}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* Location */}
          <div>
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* Openings */}
          <div>
            <label>Openings</label>
            <input
              type="number"
              name="openings"
              value={formData.openings}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* Employment Type */}
          <div>
            <label>Employment Type</label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              style={styles.input}
            >
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Internship</option>
              <option>Contract</option>
              <option>Remote</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={styles.input}
            >
              <option>Available</option>
              <option>Coming Soon</option>
              <option>Closed</option>
            </select>
          </div>

          {/* Deadline */}
          <div>
            <label>Application Deadline</label>
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>

        {/* Description */}
        <div style={{ marginTop: "20px" }}>
          <label>Description *</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            style={styles.textarea}
            required
          />
        </div>

        {/* Skills */}
        <div style={{ marginTop: "20px" }}>
          <label>Skills (comma separated)</label>

          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            style={styles.input}
            placeholder="React, Node.js, MongoDB"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={styles.button}
        >
          {loading
            ? editingJobId
              ? "Updating..."
              : "Creating..."
            : editingJobId
            ? "Update Job"
            : "Create Job"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },

  preview: {
    marginTop: "10px",
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    objectFit: "cover",
    border: "1px solid #ddd",
  },

  button: {
    marginTop: "25px",
    padding: "14px 30px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  },
};

export default JobForm;