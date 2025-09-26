
import React from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { useAppContext } from '../context/AppContext';
import CategoryCard from './CategoryCard';

const CategoriesView: React.FC = () => {
  const { categories } = useAppContext();
  const { width } = useWindowDimensions();
  const isWideScreen = width > 768;

  return (
    <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
      {categories.map(category => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </ScrollView>
  );
};

export default CategoriesView;
