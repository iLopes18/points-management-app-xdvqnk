
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Animated } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { useAppContext } from '../context/AppContext';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { addPoints, categories } = useAppContext();
  const [scaleAnim] = useState(new Animated.Value(1));

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const handleAddPoints = (userId: string, userName: string) => {
    console.log(`Adding points for task: ${task.name}, user: ${userName}`);
    
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
    addPoints(userId, task.points, task.name, categoryName);
    
    Alert.alert(
      'Points Added!',
      `${userName} earned ${task.points} points for "${task.name}"`,
      [{ text: 'OK' }]
    );
  };

  return (
    <Animated.View style={[commonStyles.card, { transform: [{ scale: scaleAnim }] }]}>
      <Text style={commonStyles.subtitle}>{task.name}</Text>
      <Text style={[commonStyles.textSecondary, { marginBottom: 16 }]}>
        {task.points} points
      </Text>
      
      <View style={commonStyles.buttonRow}>
        <TouchableOpacity
          style={buttonStyles.lara}
          onPress={() => handleAddPoints('lara', 'Lara')}
        >
          <Text style={{ color: colors.backgroundAlt, fontSize: 16, fontWeight: '600' }}>
            Lara
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={buttonStyles.isaac}
          onPress={() => handleAddPoints('isaac', 'Isaac')}
        >
          <Text style={{ color: colors.backgroundAlt, fontSize: 16, fontWeight: '600' }}>
            Isaac
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default TaskCard;
