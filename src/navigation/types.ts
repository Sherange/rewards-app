export type HomeStackParamList = {
  HomeScreen: undefined;
  RewardsScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends HomeStackParamList {}
  }
}
