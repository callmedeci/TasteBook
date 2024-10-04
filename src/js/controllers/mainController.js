export default async function loadController() {
    const path = window.location.pathname;
    let controllerModule;

    // Decide which controller to import based on the path
    if (path.split('/').at(-1).startsWith('foodRecipes')) {
        controllerModule = await import('./foodRecipesController.js');
    } else {
        controllerModule = await import('./homeController.js');
    }

    // Initialize the controller
    const controller = controllerModule.default;
    await controller();
}
