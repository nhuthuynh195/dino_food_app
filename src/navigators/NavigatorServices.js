import {
    NavigationActions,
    NavigationParams,
    NavigationRoute,
    StackActions
} from "react-navigation";

let _container; // eslint-disable-line

function setContainer(container: Object) {
    _container = container;

}

function reset(routeName: string, params?: NavigationParams) {
    _container.dispatch(
        StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: routeName })]
        })
    );
}

function navigate(routeName: string, params?: NavigationParams) {
    _container.dispatch(
        NavigationActions.navigate({
            type: "Navigation/NAVIGATE",
            routeName,
            params
        })
    );
}

function replace(routeName: string) {
    _container.dispatch(
        NavigationActions.replace({
            type: "Navigation/REPLACE",
            routeName
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
    replace,
    setContainer,
    navigateDeep,
    navigate,
    reset,
    getCurrentRoute,
    back
};
