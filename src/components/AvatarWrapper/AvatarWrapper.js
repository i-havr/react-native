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

import {
  handleSelectAvatar,
  handleDeleteAvatar,
  uploadAvatarToServer,
} from "../../helpers";

import { styles } from "./AvatarWrapper.styles";

export const AwatarWrapper = ({ avatarUri, setIsLoading, setAvatarUri }) => {
  const { avatar } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const updateUserAvatar = async () => {
    try {
      setIsLoading(true);
      const downloadURL = await uploadAvatarToServer(avatarUri, setAvatarUri);

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

  const deleteAvatar = () => {
    handleDeleteAvatar(avatarUri, setIsLoading, setAvatarUri);
    dispatch(updateUserProfile({ avatar: null }));
  };

  const showCheckButton = () => {
    return avatarUri && String(avatarUri) !== String(avatar) ? true : false;
  };

  return (
    <View style={styles.avatarWrapper}>
      <View style={styles.avatarFrame}>
        <Image
          source={avatarUri ? { uri: avatarUri } : null}
          style={styles.avatar}
        />
      </View>
      <TouchableWithoutFeedback onPress={() => {}}>
        <TouchableOpacity
          onPress={
            avatarUri
              ? deleteAvatar
              : () => handleSelectAvatar(setIsLoading, setAvatarUri)
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

      {showCheckButton() && (
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
