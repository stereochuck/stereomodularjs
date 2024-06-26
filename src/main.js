export default class {
    constructor(options) {
        this.app;
        this.modules = options.modules;
        this.currentModules = {};
        this.activeModules = {};
        this.newModules = {};
        this.moduleId = 0;
    }

    init(app, scope) {
        const container = scope || document;
        const elements = container.querySelectorAll('[data-module]');

        if (app && !this.app) {
            this.app = app;
        }

        this.activeModules['app'] = { 'app': this.app };

        elements.forEach((el) => {

            let dataModules = el.getAttribute('data-module');
            dataModules = dataModules.replace(' ','');

            if(dataModules == undefined || dataModules==""){
                console.log('Undeclared module - Check your module name.');
            }else{

                //split at ","
                let modulesList = dataModules.split(',');

                modulesList.forEach((currentModule) => {
                    let moduleName = currentModule;
                    let moduleExists = false;
                    if (this.modules[moduleName]) {
                        moduleExists = true;
                    }else{
                        console.log('"'+moduleName+'" is an unknown module or isn\'t imported.');
                    }

                    if (moduleExists) {
                        const options = {
                            el: el,
                            name: moduleName,
                            dataName: moduleName
                        };

                        const module = new this.modules[moduleName](options);
                        let id = currentModule.value;

                        if (!id) {
                            this.moduleId++;
                            id = 'm' + this.moduleId;
                            el.setAttribute('data-mid', id);
                        }

                        this.addActiveModule(moduleName, id, module);

                        const moduleId = moduleName + '-' + id;

                        if (scope) {
                            this.newModules[moduleId] = module;
                        } else {
                            this.currentModules[moduleId] = module;
                        }
                    }
                });
            }
        });

        Object.entries(this.currentModules).forEach(([id, module]) => {
            if (scope) {
                const split = id.split('-');
                const moduleName = split.shift();
                const moduleId = split.pop();
                this.addActiveModule(moduleName, moduleId, module);
            } else {
                this.initModule(module);
            }
        });
    }

    initModule(module) {
        module.mInit(this.activeModules);
        module.init();
    }

    addActiveModule(name, id, module) {
        if (this.activeModules[name]) {
            Object.assign(this.activeModules[name], { [id]: module });
        } else {
            this.activeModules[name] = { [id]: module };
        }
    }

    update(scope) {
        this.destroyScope(scope);
        
        this.init(this.app, scope);

        Object.entries(this.currentModules).forEach(([id, module]) => {
            module.mUpdate(this.activeModules);
        });

        Object.entries(this.newModules).forEach(([id, module]) => {
            this.initModule(module);
        });

        Object.assign(this.currentModules, this.newModules);
    }

    destroy(scope) {
        if (scope) {
            this.destroyScope(scope);
        } else {
            this.destroyModules();
        }
    }

    destroyScope(scope) {
        const elements = scope.querySelectorAll('*');

        elements.forEach((el) => {
            //get el data-module attribute and mid
            let moduleName = el.getAttribute('data-module');
            let moduleId = el.getAttribute('data-mid');
            let moduleExists = false;
            let module = moduleName + '-' + moduleId;
            if (this.currentModules[module]) {
                moduleExists = true;
            }

            if (moduleExists) {
                this.destroyModule(this.currentModules[module]);
                delete this.currentModules[module];
            }
        })

        this.activeModules = {};
        this.newModules = {};
    }

    destroyModules() {
        Object.entries(this.currentModules).forEach(([id, module]) => {
            this.destroyModule(module);
        });

        this.currentModules = [];
    }

    destroyModule(module) {
        module.mDestroy();
        module.destroy();
    }

    toCamel(arr) {
        return arr.reduce((a, b) => a + this.toUpper(b));
    }

    toUpper(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

export {default as module} from './module';
