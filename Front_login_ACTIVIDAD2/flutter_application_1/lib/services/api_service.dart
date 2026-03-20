import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  static final ApiService _instance = ApiService._internal();

  factory ApiService() => _instance;

  ApiService._internal();

  final String baseUrl = "http://localhost:3000/api_v1";
  String? _token;

  // Login
  Future<bool> login(String user, String password) async {
    try {
      final response = await http.post(
        Uri.parse("$baseUrl/apiUserLogin"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({"api_user": user, "api_password": password}),
      );
      if (response.statusCode != 200) return false;

      final data = jsonDecode(response.body);
      if (data is Map<String, dynamic> && data["token"] != null) {
        _token = data["token"];
        return true;
      }
      return false;
    } catch (e) {
      print('Login error: $e');
      return false;
    }
  }

  String? get token => _token;
  void setToken(String token) => _token = token;

  // Obtener datos del usuario (home)
  Future<Map<String, dynamic>?> getUserInfo(int userId) async {
    if (_token == null) return null;
    try {
      final response = await http.get(
        Uri.parse("$baseUrl/user/$userId"),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer $_token",
        },
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
    } catch (e) {
      print('getUserInfo error: $e');
    }
    return null;
  }

  // Crear estado del usuario
  Future<bool> createUserStatus(
    int userId,
    String name,
    String description,
  ) async {
    if (_token == null) return false;
    try {
      final payload = {"name": name, "description": description};

      final response = await http.post(
        Uri.parse("$baseUrl/userStatus"),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer $_token",
        },
        body: jsonEncode(payload),
      );
      if (response.statusCode == 201 || response.statusCode == 200) {
        print(
          'createUserStatus success: ${response.statusCode} ${response.body}',
        );
        return true;
      }
      print('createUserStatus failed: ${response.statusCode} ${response.body}');
      return false;
    } catch (e) {
      print('createUserStatus error: $e');
      return false;
    }
  }

  // Actualizar estado del usuario
  Future<bool> updateUserStatus(
    int userId,
    String name,
    String description,
  ) async {
    if (_token == null) return false;
    try {
      final response = await http.put(
        Uri.parse("$baseUrl/userStatus/$userId"),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer $_token",
        },
        body: jsonEncode({"name": name, "description": description}),
      );
      return response.statusCode == 200 || response.statusCode == 204;
    } catch (e) {
      print('updateUserStatus error: $e');
      return false;
    }
  }

  // Solo creación para evitar GET y posibles crashes
  Future<bool> createOrUpdateUserStatus(
    int userId,
    String name,
    String description,
  ) async {
    return await createUserStatus(userId, name, description);
  }
}
