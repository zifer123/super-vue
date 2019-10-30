import {
  mapActions,
  mapGetters
} from 'vuex';
export default {
  computed: {
    ...mapGetters(['usersList'])
  },
  methods: {
    ...mapActions(['getUsers'])
  }
};
