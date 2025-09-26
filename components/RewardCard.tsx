
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { useAppContext } from '../context/AppContext';
import { Reward } from '../types';

interface RewardCardProps {
  reward: Reward;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward }) => {
  const { totalPoints, redeemReward } = useAppContext();
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleRedeem = () => {
    console.log(`Attempting to redeem reward: ${reward.name} with combined points`);
    
    if (totalPoints < reward.pointsRequired) {
      Alert.alert(
        'Insufficient Points',
        `You need ${reward.pointsRequired} points but only have ${totalPoints} points.`,
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Redeem Reward',
      `Redeem "${reward.name}" for ${reward.pointsRequired} points from your combined total?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Redeem',
          onPress: () => {
            // Animation feedback
            Animated.sequence([
              Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
              }),
              Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
              }),
            ]).start();

            const success = redeemReward(reward.id);
            if (success) {
              Alert.alert(
                'Reward Redeemed!',
                `Successfully redeemed "${reward.name}" as a group decision!`,
                [{ text: 'Enjoy!' }]
              );
            }
          },
        },
      ]
    );
  };

  const canAfford = totalPoints >= reward.pointsRequired;

  return (
    <Animated.View style={[commonStyles.card, { transform: [{ scale: scaleAnim }] }]}>
      <Text style={commonStyles.subtitle}>{reward.name}</Text>
      {reward.description && (
        <Text style={[commonStyles.textSecondary, { marginBottom: 8 }]}>
          {reward.description}
        </Text>
      )}
      <Text style={[commonStyles.text, { marginBottom: 16, color: colors.primary }]}>
        {reward.pointsRequired} points
      </Text>
      
      <TouchableOpacity
        style={[
          {
            backgroundColor: canAfford ? '#4CAF50' : colors.grey,
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0px 2px 6px ${colors.shadow}`,
            elevation: 2,
            opacity: canAfford ? 1 : 0.6,
          }
        ]}
        onPress={handleRedeem}
        disabled={!canAfford}
      >
        <Text style={{ 
          color: colors.backgroundAlt, 
          fontSize: 18, 
          fontWeight: '600' 
        }}>
          Redeem
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default RewardCard;
