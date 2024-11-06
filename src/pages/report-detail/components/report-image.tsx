import { useReportStore } from '@/src/features';
import { convertHeight, convertWidth } from '@/src/shared';
import { Image, StyleSheet, View } from 'react-native';

function ReportImage() {
  const { report } = useReportStore();

  return <Image source={{ uri: report?.image }} style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(300),
    aspectRatio: 1,
    borderRadius: convertWidth(10),
  },
});

export { ReportImage };
