import { NavigationActions } from "react-navigation";
import type { NavigationParams, NavigationRoute } from "react-navigation";

let _container; // eslint-disable-line

function setContainer(container: Object) {
  //console.log('---setContainer --- : ',container );
  _container = container;
}

function reset(routeName: string, params?: NavigationParams) {
  _container.dispatch(
    NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          type: "Navigation/NAVIGATE",
          routeName,
          params
        })
      ]
    })
  );
}

function navigate(routeName, params) {
  //console.log('--- navigate --- : ',_container);

  _container.dispatch(
    NavigationActions.navigate({
      type: "Navigation/NAVIGATE",
      routeName,
      params
    })
  );
}

function navigateDeep(
  actions: { routeName: string, params?: NavigationParams }[]
) {
  _container.dispatch(
    actions.reduceRight(
      (prevAction, action): any =>
        NavigationActions.navigate({
          type: "Navigation/NAVIGATE",
          routeName: action.routeName,
          params: action.params,
          action: prevAction
        }),
      undefined
    )
  );
}

function back() {
  _container.dispatch(NavigationActions.back());
}

function getCurrentRoute(): NavigationRoute | null {
  if (!_container || !_container.state.nav) {
    return null;
  }

  return _container.state.nav.routes[_container.state.nav.index] || null;
}

export default {
  setContainer,
  navigateDeep,
  navigate,
  reset,
  getCurrentRoute,
  back
};
