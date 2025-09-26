
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { Category } from '../types';
import TaskCard from './TaskCard';
import Icon from './Icon';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={commonStyles.card}>
      <TouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Text style={commonStyles.subtitle}>{category.name}</Text>
        <Icon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={colors.text}
        />
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={{ marginTop: 16 }}>
          {category.tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </View>
      )}
    </View>
  );
};

export default CategoryCard;
