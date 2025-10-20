export type HomeStackParamList = {
  HomeScreen: undefined;
  BountyScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends HomeStackParamList {}
  }
}
