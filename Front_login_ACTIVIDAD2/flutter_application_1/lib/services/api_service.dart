import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  final String baseUrl = "http://192.168.1.9:3000/api_v1";
  String? _token;

  // Login
  Future<bool> login(String user, String password) async {
    final response = await http.post(
      Uri.parse("$baseUrl/apiUserLogin"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"api_user": user, "api_password": password}),
    );
    final data = jsonDecode(response.body);
    if (response.statusCode == 200 && data["token"] != null) {
      _token = data["token"];
      return true;
    }
    return false;
  }

  String? get token => _token;

  // Obtener datos del usuario (home)
  Future<Map<String, dynamic>?> getUserInfo(int userId) async {
    if (_token == null) return null;
    final response = await http.get(
      Uri.parse("$baseUrl/user/$userId"),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer $_token"
      },
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    return null;
  }

  // Obtener estado del usuario
  Future<Map<String, dynamic>?> getUserStatus(int userId) async {
    if (_token == null) return null;
    final response = await http.get(
      Uri.parse("$baseUrl/userStatus/$userId"),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer $_token"
      },
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    return null;
  }
}
