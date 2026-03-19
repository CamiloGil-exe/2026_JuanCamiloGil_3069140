import 'package:flutter/material.dart';
import 'status_screen.dart';

class HomeScreen extends StatelessWidget {
  final int userId;
  const HomeScreen({super.key, required this.userId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Dashboard'),
        centerTitle: true,
      ),
      body: Padding(
        padding: EdgeInsets.all(24),
        child: Column(
          children: [
            Card(
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              elevation: 8,
              child: ListTile(
                leading: Icon(Icons.person, color: Colors.indigo),
                title: Text('Estado de usuario'),
                subtitle: Text('Ver o actualizar tu estado actual'),
                trailing: Icon(Icons.arrow_forward_ios),
                onTap: () {
                  Navigator.push(
                      context, MaterialPageRoute(builder: (_) => StatusScreen(userId: userId)));
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}