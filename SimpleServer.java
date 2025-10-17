import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.*;
import java.net.InetSocketAddress;

public class SimpleServer {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/", new MyHandler());
        server.setExecutor(null); // default executor
        server.start();
        System.out.println("Server running on http://localhost:8080/");
    }

    static class MyHandler implements HttpHandler {
        public void handle(HttpExchange t) throws IOException {
            File file = new File("index.html");
            byte[] response = new byte[0];
            if (file.exists()) {
                response = java.nio.file.Files.readAllBytes(file.toPath());
                t.sendResponseHeaders(200, response.length);
            } else {
                String notFound = "<h1>404 Not Found</h1>";
                response = notFound.getBytes();
                t.sendResponseHeaders(404, response.length);
            }
            OutputStream os = t.getResponseBody();
            os.write(response);
            os.close();
        }
    }
}
