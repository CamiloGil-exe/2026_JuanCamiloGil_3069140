class User {
  final String id;
  final String email;
  final String status;

  User({required this.id, required this.email, required this.status});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['_id'] ?? '',
      email: json['email'] ?? '',
      status: json['status'] ?? '',
    );
  }
}