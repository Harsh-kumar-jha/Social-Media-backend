import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/fileUpload.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //step 1. get user details from frontend
  //step 2. perform validation - check for empty field
  //step 3. check if the user already  exists : using username or email
  //step 4. check for images,check for avatar
  //step 5. upload them to cloudinary , avatar
  //step 6. create user object - create entry in db
  //step 7. remove password and refresh token field from response
  //step 8. check for user creation
  //step 9. return response to user

  // step 1
  const { username, fullName, email, password } = req.body;

  // step 2
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required...");
  }

  // step 3
  const existedUser = User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with username and email already existed");
  }

  // step 4
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) throw new ApiError(400, "Avatar is required...");

  // step 5
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) throw new ApiError(400, "Avatar is required...");

  // step 6
  const user = await User.create({
    username: username.toLowerCase(),
    fullName,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  // step 7 & 8
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser)
    throw new ApiError(
      500,
      "Something went wrong while registering the user..."
    );

  // step 9
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Created Successfully"));
});

export { registerUser };
