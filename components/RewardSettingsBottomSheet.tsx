
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { useAppContext } from '../context/AppContext';
import SimpleBottomSheet from './BottomSheet';
import Icon from './Icon';
import { Reward } from '../types';

interface RewardSettingsBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

type EditMode = 'none' | 'add' | 'edit';

const RewardSettingsBottomSheet: React.FC<RewardSettingsBottomSheetProps> = ({
  isVisible,
  onClose,
}) => {
  const { rewards, addReward, updateReward, deleteReward } = useAppContext();
  
  const [editMode, setEditMode] = useState<EditMode>('none');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');
  const [tempPoints, setTempPoints] = useState('');
  const [tempDescription, setTempDescription] = useState('');

  const startAddReward = () => {
    setEditMode('add');
    setTempName('');
    setTempPoints('50');
    setTempDescription('');
  };

  const startEditReward = (reward: Reward) => {
    setEditMode('edit');
    setEditingId(reward.id);
    setTempName(reward.name);
    setTempPoints(reward.pointsRequired.toString());
    setTempDescription(reward.description || '');
  };

  const saveReward = () => {
    if (!tempName.trim()) {
      Alert.alert('Error', 'Please enter a reward name');
      return;
    }

    const points = parseInt(tempPoints);
    if (isNaN(points) || points <= 0) {
      Alert.alert('Error', 'Please enter a valid number of points');
      return;
    }

    if (editMode === 'add') {
      addReward(tempName.trim(), points, tempDescription.trim() || undefined);
      Alert.alert('Success', 'Reward added successfully');
    } else if (editMode === 'edit' && editingId) {
      updateReward(editingId, {
        name: tempName.trim(),
        pointsRequired: points,
        description: tempDescription.trim() || undefined,
      });
      Alert.alert('Success', 'Reward updated successfully');
    }

    resetForm();
  };

  const handleDeleteReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return;

    Alert.alert(
      'Delete Reward',
      `Are you sure you want to delete "${reward.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteReward(rewardId);
            Alert.alert('Success', 'Reward deleted successfully');
          },
        },
      ]
    );
  };

  const resetForm = () => {
    setEditMode('none');
    setEditingId(null);
    setTempName('');
    setTempPoints('');
    setTempDescription('');
  };

  const renderEditForm = () => {
    if (editMode === 'none') return null;

    const title = editMode === 'add' ? 'Add Reward' : 'Edit Reward';

    return (
      <View style={[commonStyles.card, { marginBottom: 16 }]}>
        <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
          {title}
        </Text>
        
        <Text style={[commonStyles.text, { marginBottom: 8 }]}>Name:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: colors.grey,
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            marginBottom: 16,
            backgroundColor: colors.backgroundAlt,
          }}
          value={tempName}
          onChangeText={setTempName}
          placeholder="Enter reward name"
          autoFocus
        />
        
        <Text style={[commonStyles.text, { marginBottom: 8 }]}>Points Required:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: colors.grey,
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            marginBottom: 16,
            backgroundColor: colors.backgroundAlt,
          }}
          value={tempPoints}
          onChangeText={setTempPoints}
          placeholder="Enter points required"
          keyboardType="numeric"
        />
        
        <Text style={[commonStyles.text, { marginBottom: 8 }]}>Description (optional):</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: colors.grey,
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            marginBottom: 16,
            backgroundColor: colors.backgroundAlt,
            minHeight: 80,
            textAlignVertical: 'top',
          }}
          value={tempDescription}
          onChangeText={setTempDescription}
          placeholder="Enter reward description"
          multiline
          numberOfLines={3}
        />
        
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            style={[buttonStyles.secondary, { flex: 1 }]}
            onPress={resetForm}
          >
            <Text style={[commonStyles.text, { color: colors.text }]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[buttonStyles.primary, { flex: 1 }]}
            onPress={saveReward}
          >
            <Text style={[commonStyles.text, { color: colors.backgroundAlt }]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={onClose}>
      <ScrollView style={{ maxHeight: 700 }}>
        <View style={{ padding: 20 }}>
          <Text style={[commonStyles.title, { marginBottom: 20 }]}>
            Manage Rewards
          </Text>
          
          {renderEditForm()}
          
          <TouchableOpacity
            style={[buttonStyles.primary, { marginBottom: 20 }]}
            onPress={startAddReward}
          >
            <Text style={[commonStyles.text, { color: colors.backgroundAlt }]}>
              Add New Reward
            </Text>
          </TouchableOpacity>
          
          {rewards.map((reward) => (
            <View key={reward.id} style={[commonStyles.card, { marginBottom: 16 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{ flex: 1, marginRight: 12 }}>
                  <Text style={[commonStyles.subtitle, { marginBottom: 4 }]}>
                    {reward.name}
                  </Text>
                  <Text style={[commonStyles.text, { color: colors.accent, marginBottom: 4 }]}>
                    {reward.pointsRequired} points
                  </Text>
                  {reward.description && (
                    <Text style={commonStyles.textSecondary}>
                      {reward.description}
                    </Text>
                  )}
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={{ padding: 8, marginRight: 4 }}
                    onPress={() => startEditReward(reward)}
                  >
                    <Icon name="pencil-outline" size={20} color={colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ padding: 8 }}
                    onPress={() => handleDeleteReward(reward.id)}
                  >
                    <Icon name="trash-outline" size={20} color={colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          
          {rewards.length === 0 && (
            <View style={[commonStyles.card, { alignItems: 'center', padding: 40 }]}>
              <Icon name="gift-outline" size={48} color={colors.textSecondary} />
              <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
                No rewards yet
              </Text>
              <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 8 }]}>
                Add your first reward to get started
              </Text>
            </View>
          )}
          
          <TouchableOpacity
            style={[buttonStyles.secondary, { marginTop: 16 }]}
            onPress={onClose}
          >
            <Text style={[commonStyles.text, { color: colors.text }]}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SimpleBottomSheet>
  );
};

export default RewardSettingsBottomSheet;
