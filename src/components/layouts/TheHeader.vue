<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <router-link class="header__logo" :to="{ name: 'index' }">
          <AppIcon name="IconLogo"></AppIcon>
          <div class="header__logo-title">mevn cloud</div>
        </router-link>

        <div class="header__login" v-if="!isLoggedIn">
          <router-link to="/login" class="header__link">Sign in</router-link>
          <router-link to="/register" class="header__link">Sign up</router-link>
        </div>
        <div class="header__profile" v-else>
          <router-link class="header__profile-img" :to="{ name: 'profile' }">
            <img :src="currentAvatar" alt="" />
          </router-link>

          <BaseButton color="text" @click="logOut"> Log out </BaseButton>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import AppIcon from "@/components/ui/AppIcon.vue";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import BaseButton from "@/components/ui/BaseButton.vue";
import defaultAvatar from "@/assets/images/user.svg";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    AppIcon,
    BaseButton,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const { isLoggedIn, user } = storeToRefs(authStore);
    const logOut = async () => {
      try {
        await authStore.logOut();
        router.push("/login");
      } catch (e) {
        console.log(e);
      }
    };
    const currentAvatar = computed(() => {
      return user.value?.avatar
        ? import.meta.env.VITE_BASE_URL + "/" + user.value?.avatar
        : defaultAvatar;
    });
    return {
      isLoggedIn,
      logOut,
      currentAvatar,
    };
  },
});
</script>

<style scoped lang="scss">
.header {
  padding: 10px 0;
  background-color: $white-color;
  font-size: 20px;
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__logo {
    display: flex;
    align-items: center;
    svg {
      width: 63px;
      height: 34px;
    }
    &-title {
      text-transform: uppercase;
      font-weight: 700;
    }
  }
  &__login {
    display: flex;
    align-items: center;
  }
  &__link {
    &:not(:last-child) {
      margin-right: 27px;
    }
  }
  &__profile {
    display: flex;
    align-items: center;
    &-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 20px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
