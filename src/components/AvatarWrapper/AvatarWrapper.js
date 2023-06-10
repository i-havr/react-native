import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/auth/authSlice";

import {
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";

import { SimpleLineIcons } from "@expo/vector-icons";
import deleteAvatarIcon from "../../../assets/icons/cancel.png";

import { handleSelectImage, uploadImageToServer } from "../../services";

import { styles } from "./AvatarWrapper.styles";

export const AwatarWrapper = ({
  avatarUri,
  setIsLoading,
  setAvatarUri,
  deleteAvatar,
  isCheckButton,
}) => {
  const { avatar } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const updateUserAvatar = async () => {
    try {
      setIsLoading(true);
      const downloadURL = await uploadImageToServer(avatarUri, "avatars");

      setAvatarUri(downloadURL);

      dispatch(updateUserProfile({ avatar: downloadURL }));

      await updateProfile(auth.currentUser, {
        photoURL: downloadURL,
      });
    } catch (error) {
      console.log("updateUserAvatar: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const showCheckButton = (isCheckButton) => {
    return isCheckButton && avatarUri && String(avatarUri) !== String(avatar)
      ? true
      : false;
  };

  return (
    <View style={styles.avatarWrapper}>
      <View style={styles.avatarFrame}>
        {avatarUri && (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        )}
      </View>
      <TouchableWithoutFeedback onPress={() => {}}>
        <TouchableOpacity
          onPress={
            avatarUri
              ? deleteAvatar
              : () => handleSelectImage(setAvatarUri, [4, 3])
          }
          activeOpacity={0.7}
        >
          {avatarUri ? (
            <Image source={deleteAvatarIcon} style={styles.changeAvatarIcon} />
          ) : (
            <SimpleLineIcons
              name="plus"
              size={25}
              color="#FF6C00"
              style={styles.addAvatarIcon}
            />
          )}
        </TouchableOpacity>
      </TouchableWithoutFeedback>

      {showCheckButton(isCheckButton) && (
        <TouchableOpacity onPress={updateUserAvatar} activeOpacity={0.7}>
          <SimpleLineIcons
            name="check"
            size={45}
            color="#32cd32"
            style={styles.okIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
