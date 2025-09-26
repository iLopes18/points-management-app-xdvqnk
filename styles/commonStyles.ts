
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#007AFF',      // iOS Blue
  secondary: '#5856D6',    // iOS Purple
  accent: '#34C759',       // iOS Green
  background: '#F2F2F7',   // Light background
  backgroundAlt: '#FFFFFF', // White background
  text: '#000000',         // Black text
  textSecondary: '#8E8E93', // Gray text
  grey: '#C7C7CC',         // Light gray
  card: '#FFFFFF',         // White card background
  shadow: 'rgba(0, 0, 0, 0.1)',
  
  // User-specific colors
  lara: '#FF69B4',         // Pink for Lara
  isaac: '#007AFF',        // Blue for Isaac
  redeem: '#34C759',       // Green for redeem buttons
  
  // Status colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 3,
  },
  secondary: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.grey,
  },
  lara: {
    backgroundColor: colors.lara,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 4,
    boxShadow: `0px 2px 6px ${colors.shadow}`,
    elevation: 2,
  },
  isaac: {
    backgroundColor: colors.isaac,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 4,
    boxShadow: `0px 2px 6px ${colors.shadow}`,
    elevation: 2,
  },
  redeem: {
    backgroundColor: colors.redeem,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 2px 6px ${colors.shadow}`,
    elevation: 2,
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 100, // Space for bottom tabs
  },
  header: {
    backgroundColor: colors.backgroundAlt,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    boxShadow: `0px 2px 4px ${colors.shadow}`,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    boxShadow: `0px 4px 12px ${colors.shadow}`,
    elevation: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  gridItem: {
    width: '48%',
    marginBottom: 16,
  },
  gridItemSingle: {
    width: '100%',
    marginBottom: 16,
  },
  bottomTabs: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.backgroundAlt,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.grey,
    boxShadow: `0px -2px 8px ${colors.shadow}`,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 4,
  },
  tabTextActive: {
    color: colors.backgroundAlt,
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
  },
  pointsItem: {
    alignItems: 'center',
    flex: 1,
  },
  pointsLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 32,
    fontWeight: '800',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
});
