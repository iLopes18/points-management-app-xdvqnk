
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { Task } from '../types';
import { useAppContext } from '../context/AppContext';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { users, addPoints } = useAppContext();
  const [completionAnimation] = useState(new Animated.Value(1));

  const handleAddPoints = (userId: string, userName: string) => {
    // Animate the card
    Animated.sequence([
      Animated.timing(completionAnimation, {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(completionAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    addPoints(userId, task.points);
    Alert.alert(
      '🎉 Points Added!',
      `${userName} earned ${task.points} points for "${task.name}"`,
      [{ text: 'Awesome!' }]
    );
  };

  return (
    <Animated.View style={{ transform: [{ scale: completionAnimation }] }}>
      <View style={[commonStyles.card, { marginVertical: 8, backgroundColor: colors.background }]}>
        <Text style={[commonStyles.text, { marginBottom: 12, fontWeight: '600' }]}>
          {task.name}
        </Text>
        <Text style={[commonStyles.textSecondary, { marginBottom: 16 }]}>
          Worth {task.points} points
        </Text>
        
        <View style={commonStyles.buttonRow}>
          {users.map(user => (
            <TouchableOpacity
              key={user.id}
              style={user.id === 'lara' ? buttonStyles.lara : buttonStyles.isaac}
              onPress={() => handleAddPoints(user.id, user.name)}
              activeOpacity={0.8}
            >
              <Text style={[commonStyles.text, { color: colors.backgroundAlt, fontWeight: '600' }]}>
                {user.name}
              </Text>
              <Text style={[commonStyles.textSecondary, { color: colors.backgroundAlt, fontSize: 12 }]}>
                +{task.points} pts
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

export default TaskCard;
