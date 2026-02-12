<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-toolbar-title>
        <v-icon class="mr-2">mdi-database</v-icon>
        Hello DB - Multi-Database CRUD
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="d-flex align-center">
                <span>데이터베이스 선택</span>
                <v-spacer></v-spacer>
                <v-chip color="success" variant="flat">
                  <v-icon start>mdi-circle</v-icon>
                  연결됨
                </v-chip>
              </v-card-title>
              <v-card-text>
                <v-select
                  v-model="selectedDb"
                  :items="databases"
                  item-title="name"
                  item-value="value"
                  label="데이터베이스 선택"
                  variant="outlined"
                  density="comfortable"
                  @update:model-value="loadUsers"
                >
                  <template v-slot:prepend>
                    <v-icon>mdi-database-outline</v-icon>
                  </template>
                </v-select>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>사용자 {{ editingUser ? '수정' : '추가' }}</v-card-title>
              <v-card-text>
                <v-form ref="form" @submit.prevent="saveUser">
                  <v-text-field
                    v-model="formData.name"
                    label="이름"
                    variant="outlined"
                    density="comfortable"
                    :rules="[v => !!v || '이름을 입력하세요']"
                    required
                  >
                    <template v-slot:prepend>
                      <v-icon>mdi-account</v-icon>
                    </template>
                  </v-text-field>

                  <v-text-field
                    v-model="formData.email"
                    label="이메일"
                    type="email"
                    variant="outlined"
                    density="comfortable"
                    :rules="[
                      v => !!v || '이메일을 입력하세요',
                      v => /.+@.+\..+/.test(v) || '올바른 이메일을 입력하세요'
                    ]"
                    required
                  >
                    <template v-slot:prepend>
                      <v-icon>mdi-email</v-icon>
                    </template>
                  </v-text-field>

                  <div class="d-flex gap-2">
                    <v-btn
                      type="submit"
                      color="primary"
                      variant="flat"
                      :loading="loading"
                      :disabled="!selectedDb"
                      block
                    >
                      <v-icon start>{{ editingUser ? 'mdi-content-save' : 'mdi-plus' }}</v-icon>
                      {{ editingUser ? '수정' : '추가' }}
                    </v-btn>
                    <v-btn
                      v-if="editingUser"
                      color="grey"
                      variant="outlined"
                      @click="cancelEdit"
                    >
                      취소
                    </v-btn>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="8">
            <v-card>
              <v-card-title class="d-flex align-center">
                <span>사용자 목록 ({{ users.length }})</span>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  variant="text"
                  :disabled="!selectedDb"
                  @click="loadUsers"
                  :loading="loading"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-alert v-if="!selectedDb" type="info" variant="tonal">
                  데이터베이스를 먼저 선택하세요.
                </v-alert>
                <v-alert v-else-if="users.length === 0" type="info" variant="tonal">
                  등록된 사용자가 없습니다. 새 사용자를 추가해보세요!
                </v-alert>
                <v-table v-else density="comfortable">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>이름</th>
                      <th>이메일</th>
                      <th>생성일</th>
                      <th>작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id">
                      <td>{{ user.id }}</td>
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ formatDate(user.created_at) }}</td>
                      <td>
                        <v-btn
                          size="small"
                          color="primary"
                          variant="text"
                          @click="editUser(user)"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn
                          size="small"
                          color="error"
                          variant="text"
                          @click="deleteUser(user.id)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar.show = false">
          닫기
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      selectedDb: '',
      databases: [
        { name: 'MySQL', value: 'mysql' },
        { name: 'MariaDB', value: 'mariadb' },
        { name: 'PostgreSQL', value: 'postgresql' },
        { name: 'Oracle', value: 'oracle' }
      ],
      formData: {
        name: '',
        email: ''
      },
      users: [],
      loading: false,
      editingUser: null,
      snackbar: {
        show: false,
        text: '',
        color: 'success'
      }
    }
  },
  methods: {
    async loadUsers() {
      if (!this.selectedDb) return
      
      this.loading = true
      try {
        const response = await axios.get(`/api/${this.selectedDb}/users`)
        this.users = response.data
      } catch (error) {
        this.showSnackbar('데이터 로드 실패: ' + error.message, 'error')
      } finally {
        this.loading = false
      }
    },
    async saveUser() {
      const { valid } = await this.$refs.form.validate()
      if (!valid) return

      this.loading = true
      try {
        if (this.editingUser) {
          await axios.put(`/api/${this.selectedDb}/users/${this.editingUser.id}`, this.formData)
          this.showSnackbar('사용자가 수정되었습니다', 'success')
        } else {
          await axios.post(`/api/${this.selectedDb}/users`, this.formData)
          this.showSnackbar('사용자가 추가되었습니다', 'success')
        }
        this.resetForm()
        this.loadUsers()
      } catch (error) {
        this.showSnackbar('저장 실패: ' + error.message, 'error')
      } finally {
        this.loading = false
      }
    },
    editUser(user) {
      this.editingUser = user
      this.formData = {
        name: user.name,
        email: user.email
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    async deleteUser(id) {
      if (!confirm('정말 삭제하시겠습니까?')) return

      this.loading = true
      try {
        await axios.delete(`/api/${this.selectedDb}/users/${id}`)
        this.showSnackbar('사용자가 삭제되었습니다', 'success')
        this.loadUsers()
      } catch (error) {
        this.showSnackbar('삭제 실패: ' + error.message, 'error')
      } finally {
        this.loading = false
      }
    },
    resetForm() {
      this.formData = {
        name: '',
        email: ''
      }
      this.editingUser = null
      this.$refs.form.reset()
    },
    cancelEdit() {
      this.resetForm()
    },
    showSnackbar(text, color = 'success') {
      this.snackbar = {
        show: true,
        text,
        color
      }
    },
    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleString('ko-KR')
    }
  }
}
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>
