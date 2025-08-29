"use client";
import {
  selectAuthToken,
  selectSearchDetails,
  selectUser,
} from "@src/redux/reducers/authSlice";
import { useAppSelector } from "@src/redux/store";

const useAuth = () => {
  const authToken = useAppSelector(selectSearchDetails);
  console.log("hello final login is myyyy------");
  console.log(authToken);
  const user = useAppSelector(selectUser);
  console.log("main user is commigggg--------");
  console.log(user);

  const isLoggedIn = !!authToken;
  console.log("hello login is here");
  //const modelType = user?.modelType ?? null;

  return { isLoggedIn, user };
};

export default useAuth;
