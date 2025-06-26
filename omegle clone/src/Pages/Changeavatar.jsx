import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeAvatar } from "../App/Redux_Toolkit/Slices/ChangeAvavtar"; // Import the correct slice

function ChangeAvtr() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const { status, error } = useSelector((state) => state.Change_Avavtat); // Assuming state.avatar manages avatar updates

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    dispatch(ChangeAvatar(formData));
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Avatar</button>

      {status === "loading" && <p>Uploading...</p>}
      {status === "success" && <p>Avatar updated successfully!</p>}
      {status === "failed" && <p>Error: {error}</p>}
    </div>
  );
}

export default ChangeAvtr;
