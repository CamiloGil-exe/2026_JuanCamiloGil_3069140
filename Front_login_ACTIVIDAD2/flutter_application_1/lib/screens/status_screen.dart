import 'package:flutter/material.dart';
import '../services/api_service.dart';

class StatusScreen extends StatefulWidget {
  final int userId;
  const StatusScreen({super.key, required this.userId});

  @override
  _StatusScreenState createState() => _StatusScreenState();
}

class _StatusScreenState extends State<StatusScreen> {
      void createStatus() async {
        if (statusController.text.isEmpty) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Escribe un estado primero')),
          );
          return;
        }
        setState(() => isLoading = true);
        // Aquí deberías tener un método en ApiService para actualizar el estado
        // Suponiendo que sea un endpoint tipo POST o PUT
        // Ejemplo:
        final response = await api.getUserStatus(widget.userId); // Cambia esto por el método correcto
        // Si tienes un método como api.updateUserStatus(userId, status), úsalo
        setState(() => isLoading = false);
        if (response != null) {
          setState(() => statusText = statusController.text);
          statusController.clear();
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Estado actualizado')),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('No se pudo actualizar el estado')),
          );
        }
      }
    @override
    void dispose() {
      statusController.dispose();
      super.dispose();
    }
  final TextEditingController statusController = TextEditingController();
  final ApiService api = ApiService();
  String statusText = '';
  bool isLoading = false;

  void fetchStatus() async {
    setState(() => isLoading = true);
    final res = await api.getUserStatus(widget.userId);
    setState(() => isLoading = false);
    if (res != null && res['status'] != null) {
      setState(() => statusText = res['status'].toString());
    }
  }

  @override
  void initState() {
    super.initState();
    fetchStatus();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Estado de Usuario')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            AnimatedContainer(
              duration: const Duration(milliseconds: 400),
              curve: Curves.easeInOut,
              width: double.infinity,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Colors.indigo.shade50, Colors.indigo.shade100],
                ),
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(
                    color: Colors.indigo.shade100.withOpacity(0.5),
                    blurRadius: 12,
                    offset: const Offset(0, 6),
                  ),
                ],
              ),
              padding: const EdgeInsets.all(24),
              child: statusText.isEmpty
                  ? const Text(
                      'Aún no tienes un estado',
                      style: TextStyle(fontSize: 16, color: Colors.indigo),
                    )
                  : Text(
                      statusText,
                      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
            ),
            const SizedBox(height: 32),
            TextField(
              controller: statusController,
              decoration: InputDecoration(
                labelText: 'Escribe tu nuevo estado',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                prefixIcon: const Icon(Icons.edit),
              ),
            ),
            const SizedBox(height: 16),
            isLoading
                ? const CircularProgressIndicator()
                : SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: createStatus,
                      style: ElevatedButton.styleFrom(
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      child: const Padding(
                        padding: EdgeInsets.symmetric(vertical: 16),
                        child: Text('Actualizar Estado', style: TextStyle(fontSize: 18)),
                      ),
                    ),
                  ),
          ],
        ),
      ),
    );
  }
}