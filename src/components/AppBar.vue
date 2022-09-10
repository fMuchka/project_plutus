<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, ref } from '@vue/reactivity';
import { useResourceStore } from "../stores/resource"
import type { RouteRecordName } from 'vue-router';
import { useTheme } from 'vuetify'

const router = useRouter();
const routes = router.getRoutes();

const currentRoute = computed(() => {
    return router.currentRoute.value;
})

const resourceStore = useResourceStore();
const { getPageLabel, getAccountLabel } = resourceStore; 
    
const isDrawerVisible = ref(false);


const pageIcons: { [key: RouteRecordName]: string;  } = {
    "home": "mdi-view-dashboard",
    "portfolio": "mdi-finance"
};

const theme = useTheme()
const toggleTheme = () => theme.global.name.value = theme.global.current.value.dark ? 'LIGHT_THEME' : 'DARK_THEME';

</script>


<template>
        <v-app-bar app color="primary">
            
            <v-app-bar-nav-icon @click.stop="isDrawerVisible = !isDrawerVisible"></v-app-bar-nav-icon>

            <v-app-bar-title>{{getPageLabel( currentRoute.name )}}</v-app-bar-title>

            <template v-slot:append> 
                <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"></v-btn>
            </template>
        </v-app-bar>

        <v-navigation-drawer
            v-model="isDrawerVisible"
            temporary
        >
            <v-list-item
                prepend-icon="mdi-account-circle"
                :title="getAccountLabel('unsigned')"
            >
            </v-list-item>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item 
                    v-for="(item, key) in routes"
                    :key="`nav_route_${key}`"

                    :prepend-icon="pageIcons[ item.name as RouteRecordName ]" 
                    :title="getPageLabel( item.name )" 
                    :value="item.path"
                    :to="item.path"
                />
            </v-list>
        </v-navigation-drawer>
</template>