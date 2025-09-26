
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
        <TouchableOpacity
          style={[
            buttonStyles.lara,
            !canAfford && { backgroundColor: colors.grey, opacity: 0.6 }
          ]}
          onPress={() => handleRedeem('lara', 'Lara')}
          disabled={!canAfford}
        >
          <Text style={{ 
            color: colors.backgroundAlt, 
            fontSize: 16, 
            fontWeight: '600' 
          }}>
            Lara
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            buttonStyles.isaac,
            !canAfford && { backgroundColor: colors.grey, opacity: 0.6 }
          ]}
          onPress={() => handleRedeem('isaac', 'Isaac')}
          disabled={!canAfford}
        >
          <Text style={{ 
            color: colors.backgroundAlt, 
            fontSize: 16, 
            fontWeight: '600' 
          }}>
            Isaac
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default RewardCard;
