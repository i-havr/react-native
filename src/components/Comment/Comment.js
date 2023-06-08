import { View, Text, Image, TouchableWithoutFeedback } from "react-native";

import { convertDateFormat } from "../../helpers";
import { styles } from "./Comment.styles";

export const Comment = ({ comment, isPostOwner }) => {
  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View
        style={{
          ...styles.commentWrapper,
          flexDirection: isPostOwner ? "row-reverse" : "row",
        }}
      >
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: comment.avatar }}
            style={styles.commentAvatar}
          />
        </View>
        <View style={styles.commentMessageWrapper}>
          <Text style={styles.commentMessage}>{comment.message}</Text>
          <Text style={styles.commentCreatedAt}>
            {convertDateFormat(comment.createdAt.seconds)}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
