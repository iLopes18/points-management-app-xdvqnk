
import React from 'react';
import { ScrollView, View } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { useAppContext } from '../context/AppContext';
import { useResponsive } from '../hooks/useResponsive';
import RewardCard from './RewardCard';

const RewardsView: React.FC = () => {
  const { rewards } = useAppContext();
  const { isWideScreen } = useResponsive();

  return (
    <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
      <View style={commonStyles.grid}>
        {rewards.map(reward => (
          <View
            key={reward.id}
            style={isWideScreen ? commonStyles.gridItem : commonStyles.gridItemSingle}
          >
            <RewardCard reward={reward} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default RewardsView;
