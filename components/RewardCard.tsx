
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { useAppContext } from '../context/AppContext';
import { Reward } from '../types';

interface RewardCardProps {
  reward: Reward;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward }) => {
  const { totalPoints, redeemReward, users } = useAppContext();
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleRedeem = (userId: string, userName: string) => {
    console.log(`Attempting to redeem reward: ${reward.name} for user: ${userName}`);
    
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
      `${userName} wants to redeem "${reward.name}" for ${reward.pointsRequired} points?`,
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

            const success = redeemReward(userId, reward.id);
            if (success) {
              Alert.alert(
                'Reward Redeemed!',
                `${userName} successfully redeemed "${reward.name}"`,
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
      
      <View style={commonStyles.buttonRow}>
        {users.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={[
              {
                backgroundColor: canAfford ? user.color : colors.grey,
                paddingHorizontal: 20,
                paddingVertical: 14,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                marginHorizontal: 4,
                boxShadow: `0px 2px 6px ${colors.shadow}`,
                elevation: 2,
                opacity: canAfford ? 1 : 0.6,
              }
            ]}
            onPress={() => handleRedeem(user.id, user.name)}
            disabled={!canAfford}
          >
            <Text style={{ 
              color: colors.backgroundAlt, 
              fontSize: 16, 
              fontWeight: '600' 
            }}>
              {user.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

export default RewardCard;
