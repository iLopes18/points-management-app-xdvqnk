
import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
  const { totalPoints } = useAppContext();

  return (
    <View style={commonStyles.header}>
      <View style={{ marginBottom: 16 }}>
        <Text style={commonStyles.title}>Points Tracker</Text>
      </View>
      
      <View style={commonStyles.pointsContainer}>
        <View style={commonStyles.pointsItem}>
          <Text style={[commonStyles.pointsLabel, { color: colors.primary }]}>
            Total Points
          </Text>
          <Text style={[commonStyles.pointsValue, { color: colors.primary }]}>
            {totalPoints}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
