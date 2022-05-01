import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export const fetchUser = async (searchTerm, org) => {
  try {
    const response = await axios.get(
      "https://api.github.com/search/users?q=" + searchTerm + org
    );
    return response.data.items;
  } catch (e) {
    toast.error("All the fields must have value");
  }
};
