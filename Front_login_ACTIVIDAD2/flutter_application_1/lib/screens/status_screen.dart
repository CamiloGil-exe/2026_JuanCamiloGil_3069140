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
    if (api.token == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Token inválido. Vuelve a iniciar sesión.'),
        ),
      );
      return;
    }

    final name = statusNameController.text.trim();
    final description = statusDescriptionController.text.trim();

    if (name.isEmpty || description.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Debe ingresar nombre y descripción')),
      );
      return;
    }

    setState(() => isLoading = true);
    final success = await api.createUserStatus(
      widget.userId,
      name,
      description,
    );
    setState(() => isLoading = false);

    if (success) {
      setState(() => statusText = '$name: $description');
      statusNameController.clear();
      statusDescriptionController.clear();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Estado guardado correctamente')),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('No se pudo guardar el estado')),
      );
    }
  }

  @override
  void dispose() {
    statusNameController.dispose();
    statusDescriptionController.dispose();
    super.dispose();
  }

  final TextEditingController statusNameController = TextEditingController();
  final TextEditingController statusDescriptionController =
      TextEditingController();
  final ApiService api = ApiService();
  String statusText = '';
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    // No se usan GET en esta pantalla: solo creación POST.
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
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
            ),
            const SizedBox(height: 32),
            TextField(
              controller: statusNameController,
              decoration: InputDecoration(
                labelText: 'Nombre del estado',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                prefixIcon: const Icon(Icons.label),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: statusDescriptionController,
              maxLines: 2,
              decoration: InputDecoration(
                labelText: 'Descripción del estado',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                prefixIcon: const Icon(Icons.description),
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
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      child: const Padding(
                        padding: EdgeInsets.symmetric(vertical: 16),
                        child: Text(
                          'Crear Estado',
                          style: TextStyle(fontSize: 18),
                        ),
                      ),
                    ),
                  ),
          ],
        ),
      ),
    );
  }
}
