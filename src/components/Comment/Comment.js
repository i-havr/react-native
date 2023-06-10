import React, { useState, useLayoutEffect } from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";

import { convertDateFormat } from "../../helpers";
import { getCurrentUserComment } from "../../services";
import { styles } from "./Comment.styles";

export const Comment = ({ comment, userId, postId }) => {
  const [isCurrentUserComment, setIsCurrentUserComment] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useLayoutEffect(() => {
    const f = async () => {
      await getCurrentUserComment(
        userId,
        postId,
        comment.id,
        setIsCurrentUserComment
      );

      setIsFirstRender(false);
    };
    f();
  }, []);

  {
    if (!isFirstRender) {
      return (
        <TouchableWithoutFeedback onPress={() => {}}>
          <View
            style={{
              ...styles.commentWrapper,
              flexDirection: isCurrentUserComment ? "row" : "row-reverse",
            }}
          >
            <View
              style={{
                ...styles.commentMessageWrapper,
                borderTopRightRadius: isCurrentUserComment ? 0 : 6,
                borderTopLeftRadius: isCurrentUserComment ? 6 : 0,
              }}
            >
              <Text style={styles.commentMessage}>{comment.message}</Text>
              <Text style={styles.commentCreatedAt}>
                {convertDateFormat(comment.createdAt.seconds)}
              </Text>
            </View>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: comment.avatar }}
                style={styles.commentAvatar}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }
};
