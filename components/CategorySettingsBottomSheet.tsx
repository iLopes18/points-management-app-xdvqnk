
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { useAppContext } from '../context/AppContext';
import SimpleBottomSheet from './BottomSheet';
import Icon from './Icon';
import { Category, Task } from '../types';

interface CategorySettingsBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

type EditMode = 'none' | 'category' | 'task' | 'add-category' | 'add-task';

const CategorySettingsBottomSheet: React.FC<CategorySettingsBottomSheetProps> = ({
  isVisible,
  onClose,
}) => {
  const { 
    categories, 
    users,
    addCategory, 
    updateCategory, 
    deleteCategory,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
  } = useAppContext();
  
  const [editMode, setEditMode] = useState<EditMode>('none');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');
  const [tempUserPoints, setTempUserPoints] = useState<{ [userId: string]: string }>({});
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const startAddCategory = () => {
    setEditMode('add-category');
    setTempName('');
  };

  const startAddTask = (categoryId: string) => {
    setEditMode('add-task');
    setSelectedCategoryId(categoryId);
    setTempName('');
    // Initialize with default points for each user
    const defaultPoints: { [userId: string]: string } = {};
    users.forEach(user => {
      defaultPoints[user.id] = '10';
    });
    setTempUserPoints(defaultPoints);
  };

  const startEditCategory = (category: Category) => {
    setEditMode('category');
    setEditingId(category.id);
    setTempName(category.name);
  };

  const startEditTask = (task: Task) => {
    setEditMode('task');
    setEditingId(task.id);
    setTempName(task.name);
    // Convert user points to string format for editing
    const userPointsStr: { [userId: string]: string } = {};
    users.forEach(user => {
      userPointsStr[user.id] = (task.userPoints[user.id] || 0).toString();
    });
    setTempUserPoints(userPointsStr);
    setSelectedCategoryId(task.categoryId);
  };

  const saveCategory = () => {
    if (!tempName.trim()) {
      Alert.alert('Error', 'Please enter a category name');
      return;
    }

    if (editMode === 'add-category') {
      addCategory(tempName.trim());
      Alert.alert('Success', 'Category added successfully');
    } else if (editMode === 'category' && editingId) {
      updateCategory(editingId, { name: tempName.trim() });
      Alert.alert('Success', 'Category updated successfully');
    }

    resetForm();
  };

  const saveTask = () => {
    if (!tempName.trim()) {
      Alert.alert('Error', 'Please enter a task name');
      return;
    }

    // Validate and convert user points
    const userPoints: { [userId: string]: number } = {};
    let hasError = false;

    for (const user of users) {
      const pointsStr = tempUserPoints[user.id] || '0';
      const points = parseInt(pointsStr);
      if (isNaN(points) || points < 0) {
        Alert.alert('Error', `Please enter valid points for ${user.name}`);
        hasError = true;
        break;
      }
      userPoints[user.id] = points;
    }

    if (hasError) return;

    if (editMode === 'add-task') {
      addTask(selectedCategoryId, tempName.trim(), userPoints);
      Alert.alert('Success', 'Task added successfully');
    } else if (editMode === 'task' && editingId) {
      updateTask(editingId, { 
        name: tempName.trim(), 
        userPoints,
        categoryId: selectedCategoryId,
      });
      Alert.alert('Success', 'Task updated successfully');
    }

    resetForm();
  };

  const handleDeleteCategory = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete "${category.name}" and all its tasks? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteCategory(categoryId);
            Alert.alert('Success', 'Category deleted successfully');
          },
        },
      ]
    );
  };

  const handleDeleteTask = (taskId: string) => {
    const task = findTaskById(taskId);
    if (!task) return;

    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${task.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTask(taskId);
            Alert.alert('Success', 'Task deleted successfully');
          },
        },
      ]
    );
  };

  const findTaskById = (taskId: string): Task | undefined => {
    for (const category of categories) {
      const task = category.tasks.find(t => t.id === taskId);
      if (task) return task;
    }
    return undefined;
  };

  const resetForm = () => {
    setEditMode('none');
    setEditingId(null);
    setTempName('');
    setTempUserPoints({});
    setSelectedCategoryId('');
  };

  const updateUserPoints = (userId: string, points: string) => {
    setTempUserPoints(prev => ({
      ...prev,
      [userId]: points
    }));
  };

  const renderEditForm = () => {
    if (editMode === 'none') return null;

    const isTaskMode = editMode === 'task' || editMode === 'add-task';
    const title = editMode === 'add-category' ? 'Add Category' :
                  editMode === 'add-task' ? 'Add Task' :
                  editMode === 'category' ? 'Edit Category' : 'Edit Task';

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
          placeholder={isTaskMode ? "Enter task name" : "Enter category name"}
          autoFocus
        />
        
        {isTaskMode && (
          <>
            <Text style={[commonStyles.text, { marginBottom: 12 }]}>Points for each user:</Text>
            {users.map((user) => (
              <View key={user.id} style={{ marginBottom: 12 }}>
                <Text style={[commonStyles.text, { marginBottom: 4, color: user.color, fontWeight: '600' }]}>
                  {user.name}:
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: colors.grey,
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 16,
                    backgroundColor: colors.backgroundAlt,
                  }}
                  value={tempUserPoints[user.id] || ''}
                  onChangeText={(text) => updateUserPoints(user.id, text)}
                  placeholder="Enter points"
                  keyboardType="numeric"
                />
              </View>
            ))}
            
            {editMode === 'task' && (
              <>
                <Text style={[commonStyles.text, { marginBottom: 8, marginTop: 8 }]}>Category:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    {categories.map((category) => (
                      <TouchableOpacity
                        key={category.id}
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 8,
                          borderRadius: 20,
                          backgroundColor: selectedCategoryId === category.id ? colors.primary : colors.background,
                          borderWidth: 1,
                          borderColor: colors.grey,
                        }}
                        onPress={() => setSelectedCategoryId(category.id)}
                      >
                        <Text style={{
                          color: selectedCategoryId === category.id ? colors.backgroundAlt : colors.text,
                          fontWeight: '500',
                        }}>
                          {category.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </>
            )}
          </>
        )}
        
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
            onPress={isTaskMode ? saveTask : saveCategory}
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
            Manage Categories & Tasks
          </Text>
          
          {renderEditForm()}
          
          <TouchableOpacity
            style={[buttonStyles.primary, { marginBottom: 20 }]}
            onPress={startAddCategory}
          >
            <Text style={[commonStyles.text, { color: colors.backgroundAlt }]}>
              Add New Category
            </Text>
          </TouchableOpacity>
          
          {categories.map((category) => (
            <View key={category.id} style={[commonStyles.card, { marginBottom: 16 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Text style={[commonStyles.subtitle, { flex: 1 }]}>
                  {category.name}
                </Text>
                <TouchableOpacity
                  style={{ padding: 8, marginRight: 8 }}
                  onPress={() => startAddTask(category.id)}
                >
                  <Icon name="add-outline" size={20} color={colors.accent} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ padding: 8, marginRight: 8 }}
                  onPress={() => startEditCategory(category)}
                >
                  <Icon name="pencil-outline" size={20} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ padding: 8 }}
                  onPress={() => handleDeleteCategory(category.id)}
                >
                  <Icon name="trash-outline" size={20} color={colors.error} />
                </TouchableOpacity>
              </View>
              
              {category.tasks.map((task) => (
                <View key={task.id} style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  backgroundColor: colors.background,
                  borderRadius: 8,
                  marginBottom: 8,
                }}>
                  <View style={{ flex: 1 }}>
                    <Text style={[commonStyles.text, { marginBottom: 4 }]}>
                      {task.name}
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      {users.map((user) => (
                        <Text key={user.id} style={[commonStyles.textSecondary, { color: user.color }]}>
                          {user.name}: {task.userPoints[user.id] || 0}
                        </Text>
                      ))}
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{ padding: 8, marginRight: 4 }}
                    onPress={() => startEditTask(task)}
                  >
                    <Icon name="pencil-outline" size={16} color={colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ padding: 8 }}
                    onPress={() => handleDeleteTask(task.id)}
                  >
                    <Icon name="trash-outline" size={16} color={colors.error} />
                  </TouchableOpacity>
                </View>
              ))}
              
              {category.tasks.length === 0 && (
                <Text style={[commonStyles.textSecondary, { textAlign: 'center', padding: 16 }]}>
                  No tasks in this category
                </Text>
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

export default CategorySettingsBottomSheet;
