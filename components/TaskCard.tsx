
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { useAppContext } from '../context/AppContext';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { addPoints, categories, users } = useAppContext();
  const [scaleAnim] = useState(new Animated.Value(1));

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const handleAddPoints = (userId: string, userName: string) => {
    const userPoints = task.userPoints[userId] || 0;
    console.log(`Adding ${userPoints} points for task: ${task.name}, user: ${userName}`);
    
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

    const categoryName = getCategoryName(task.categoryId);
    addPoints(userId, userPoints, task.name, categoryName);
    
    Alert.alert(
      'Points Added!',
      `${userName} earned ${userPoints} points for "${task.name}"`,
      [{ text: 'OK' }]
    );
  };

  return (
    <Animated.View style={[commonStyles.card, { transform: [{ scale: scaleAnim }] }]}>
      <Text style={commonStyles.subtitle}>{task.name}</Text>
      
      <View style={commonStyles.buttonRow}>
        {users.map((user) => {
          const userPoints = task.userPoints[user.id] || 0;
          return (
            <TouchableOpacity
              key={user.id}
              style={[
                {
                  backgroundColor: user.color,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  marginHorizontal: 4,
                  boxShadow: `0px 2px 6px ${colors.shadow}`,
                  elevation: 2,
                }
              ]}
              onPress={() => handleAddPoints(user.id, user.name)}
            >
              <Text style={{ 
                color: colors.backgroundAlt, 
                fontSize: 14, 
                fontWeight: '600',
                textAlign: 'center'
              }}>
                {user.name}
              </Text>
              <Text style={{ 
                color: colors.backgroundAlt, 
                fontSize: 16, 
                fontWeight: 'bold',
                marginTop: 2
              }}>
                +{userPoints}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

export default TaskCard;
