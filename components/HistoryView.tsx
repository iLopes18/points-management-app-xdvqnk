
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { useAppContext } from '../context/AppContext';
import { HistoryEntry } from '../types';
import Icon from './Icon';

const HistoryView: React.FC = () => {
  const { history } = useAppContext();

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return diffInMinutes <= 1 ? 'Just now' : `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  const renderHistoryItem = (entry: HistoryEntry) => {
    const isTask = entry.type === 'task';
    const pointsColor = entry.points > 0 ? colors.success : colors.error;

    return (
      <View key={entry.id} style={[commonStyles.card, { marginHorizontal: 16 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: entry.userColor,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Icon
                name={isTask ? 'check' : 'gift'}
                size={20}
                color={colors.backgroundAlt}
              />
            </View>
            
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={[commonStyles.subtitle, { color: entry.userColor, fontSize: 16 }]}>
                  {entry.userName}
                </Text>
                <Text style={[commonStyles.textSecondary, { marginLeft: 8 }]}>
                  {isTask ? 'completed' : 'redeemed'}
                </Text>
              </View>
              
              <Text style={[commonStyles.text, { fontSize: 15, marginBottom: 2 }]}>
                {isTask ? entry.taskName : entry.rewardName}
              </Text>
              
              {isTask && entry.categoryName && (
                <Text style={[commonStyles.textSecondary, { fontSize: 13 }]}>
                  {entry.categoryName}
                </Text>
              )}
              
              <Text style={[commonStyles.textSecondary, { fontSize: 12, marginTop: 4 }]}>
                {formatDate(entry.timestamp)}
              </Text>
            </View>
          </View>
          
          <View style={{ alignItems: 'flex-end' }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: pointsColor,
              }}
            >
              {entry.points > 0 ? '+' : ''}{entry.points}
            </Text>
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
              points
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (history.length === 0) {
    return (
      <ScrollView style={commonStyles.content}>
        <View style={{ 
          flex: 1, 
          alignItems: 'center', 
          justifyContent: 'center', 
          paddingTop: 100 
        }}>
          <Icon name="clock" size={64} color={colors.textSecondary} />
          <Text style={[commonStyles.subtitle, { 
            color: colors.textSecondary, 
            textAlign: 'center',
            marginTop: 16 
          }]}>
            No history yet
          </Text>
          <Text style={[commonStyles.textSecondary, { 
            textAlign: 'center',
            marginTop: 8,
            paddingHorizontal: 32
          }]}>
            Complete tasks or redeem rewards to see your activity history here
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={commonStyles.content}>
      <View style={{ paddingTop: 16, paddingBottom: 20 }}>
        <Text style={[commonStyles.subtitle, { 
          marginHorizontal: 16, 
          marginBottom: 16,
          color: colors.text 
        }]}>
          Activity History
        </Text>
        
        {history.map(renderHistoryItem)}
      </View>
    </ScrollView>
  );
};

export default HistoryView;
