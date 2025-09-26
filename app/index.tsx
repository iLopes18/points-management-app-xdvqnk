
import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '../styles/commonStyles';
import { AppProvider } from '../context/AppContext';
import { TabType } from '../types';
import Header from '../components/Header';
import BottomTabs from '../components/BottomTabs';
import CategoriesView from '../components/CategoriesView';
import RewardsView from '../components/RewardsView';
import HistoryView from '../components/HistoryView';

export default function MainScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('categories');

  const renderContent = () => {
    switch (activeTab) {
      case 'categories':
        return <CategoriesView />;
      case 'rewards':
        return <RewardsView />;
      case 'history':
        return <HistoryView />;
      default:
        return <CategoriesView />;
    }
  };

  return (
    <AppProvider>
      <SafeAreaView style={commonStyles.container}>
        <Header />
        <View style={{ flex: 1 }}>
          {renderContent()}
        </View>
        <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </SafeAreaView>
    </AppProvider>
  );
}
