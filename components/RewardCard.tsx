
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { Reward } from '../types';
import { useAppContext } from '../context/AppContext';

interface RewardCardProps {
  reward: Reward;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward }) => {
  const { users, redeemReward } = useAppContext();
  const [redeemAnimation] = useState(new Animated.Value(1));

  const handleRedeem = (userId: string, userName: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    if (user.points < reward.pointsRequired) {
      Alert.alert(
        '❌ Insufficient Points',
        `${userName} needs ${reward.pointsRequired - user.points} more points to redeem this reward.`,
        [{ text: 'Keep earning!' }]
      );
      return;
    }

    Alert.alert(
      '🎁 Redeem Reward',
      `${userName} wants to redeem "${reward.name}" for ${reward.pointsRequired} points?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Redeem',
          onPress: () => {
            // Animate the card
            Animated.sequence([
              Animated.timing(redeemAnimation, {
                toValue: 0.95,
                duration: 150,
                useNativeDriver: true,
              }),
              Animated.timing(redeemAnimation, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
              }),
            ]).start();

            const success = redeemReward(userId, reward.id);
            if (success) {
              Alert.alert(
                '🎉 Reward Redeemed!',
                `${userName} successfully redeemed "${reward.name}"!`,
                [{ text: 'Enjoy! 🎊' }]
              );
            }
          },
        },
      ]
    );
  };

  return (
    <Animated.View style={{ transform: [{ scale: redeemAnimation }] }}>
      <View style={commonStyles.card}>
        <Text style={[commonStyles.subtitle, { marginBottom: 8 }]}>
          {reward.name}
        </Text>
        {reward.description && (
          <Text style={[commonStyles.textSecondary, { marginBottom: 12 }]}>
            {reward.description}
          </Text>
        )}
        <Text style={[commonStyles.text, { marginBottom: 16, fontWeight: '600', color: colors.primary }]}>
          {reward.pointsRequired} points required
        </Text>
        
        <View style={commonStyles.buttonRow}>
          {users.map(user => {
            const canRedeem = user.points >= reward.pointsRequired;
            const progress = Math.min((user.points / reward.pointsRequired) * 100, 100);
            
            return (
              <TouchableOpacity
                key={user.id}
                style={[
                  user.id === 'lara' ? buttonStyles.lara : buttonStyles.isaac,
                  !canRedeem && { opacity: 0.6 }
                ]}
                onPress={() => handleRedeem(user.id, user.name)}
                disabled={!canRedeem}
                activeOpacity={0.8}
              >
                <Text style={[commonStyles.text, { color: colors.backgroundAlt, fontWeight: '600' }]}>
                  {user.name}
                </Text>
                <Text style={[commonStyles.textSecondary, { color: colors.backgroundAlt, fontSize: 12 }]}>
                  {user.points}/{reward.pointsRequired} ({Math.round(progress)}%)
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Animated.View>
  );
};

export default RewardCard;
