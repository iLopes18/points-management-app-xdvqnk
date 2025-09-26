
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { useAppContext } from '../context/AppContext';
import SimpleBottomSheet from './BottomSheet';
import Icon from './Icon';

interface UserSettingsBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

const UserSettingsBottomSheet: React.FC<UserSettingsBottomSheetProps> = ({
  isVisible,
  onClose,
}) => {
  const { users, updateUser } = useAppContext();
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');
  const [tempColor, setTempColor] = useState('');

  const colorOptions = [
    '#FF69B4', // Pink
    '#007AFF', // Blue
    '#34C759', // Green
    '#FF9500', // Orange
    '#5856D6', // Purple
    '#FF3B30', // Red
    '#00C7BE', // Teal
    '#8E8E93', // Gray
  ];

  const startEditing = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setEditingUser(userId);
      setTempName(user.name);
      setTempColor(user.color);
    }
  };

  const saveUser = () => {
    if (!editingUser || !tempName.trim()) {
      Alert.alert('Error', 'Please enter a valid name');
      return;
    }

    updateUser(editingUser, {
      name: tempName.trim(),
      color: tempColor,
    });

    setEditingUser(null);
    setTempName('');
    setTempColor('');
    
    Alert.alert('Success', 'User updated successfully');
  };

  const cancelEditing = () => {
    setEditingUser(null);
    setTempName('');
    setTempColor('');
  };

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={onClose}>
      <ScrollView style={{ maxHeight: 600 }}>
        <View style={{ padding: 20 }}>
          <Text style={[commonStyles.title, { marginBottom: 20 }]}>Edit Users</Text>
          
          {users.map((user) => (
            <View key={user.id} style={[commonStyles.card, { marginBottom: 16 }]}>
              {editingUser === user.id ? (
                <View>
                  <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
                    Editing {user.name}
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
                    placeholder="Enter user name"
                    autoFocus
                  />
                  
                  <Text style={[commonStyles.text, { marginBottom: 8 }]}>Color:</Text>
                  <View style={{ 
                    flexDirection: 'row', 
                    flexWrap: 'wrap', 
                    marginBottom: 16,
                    gap: 8,
                  }}>
                    {colorOptions.map((color) => (
                      <TouchableOpacity
                        key={color}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: color,
                          borderWidth: tempColor === color ? 3 : 1,
                          borderColor: tempColor === color ? colors.text : colors.grey,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => setTempColor(color)}
                      >
                        {tempColor === color && (
                          <Icon name="checkmark-outline" size={20} color={colors.backgroundAlt} />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                  
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TouchableOpacity
                      style={[buttonStyles.secondary, { flex: 1 }]}
                      onPress={cancelEditing}
                    >
                      <Text style={[commonStyles.text, { color: colors.text }]}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[buttonStyles.primary, { flex: 1 }]}
                      onPress={saveUser}
                    >
                      <Text style={[commonStyles.text, { color: colors.backgroundAlt }]}>
                        Save
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: user.color,
                      marginRight: 16,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[commonStyles.subtitle, { marginBottom: 4 }]}>
                      {user.name}
                    </Text>
                    <Text style={commonStyles.textSecondary}>
                      Color: {user.color}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      padding: 8,
                      borderRadius: 8,
                      backgroundColor: colors.background,
                    }}
                    onPress={() => startEditing(user.id)}
                  >
                    <Icon name="pencil-outline" size={20} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
          
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

export default UserSettingsBottomSheet;
