import { Text, View } from 'react-native';

import { convertHeight, convertWidth } from '../../global/index';
import { textStyles } from '../../styles/lib/text';

function HeadLineText({ title, subTitle }: { title: string; subTitle: string }) {
  return (
    <View
      style={{
        width: convertWidth(331),
        height: convertHeight(129),

        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          ...textStyles.title,
          ...{
            width: '100%',
            height: '59.15%',
          },
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          ...textStyles.subTitle,
          ...{
            width: '100%',
            height: '30.98%',
          },
        }}
      >
        {subTitle}
      </Text>
    </View>
  );
}

export { HeadLineText };
