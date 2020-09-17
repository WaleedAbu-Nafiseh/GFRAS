package pp.facerecognizer.env;

import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.os.Environment;
import android.util.Log;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Scanner;

public class FileUtils {
    private static final Logger LOGGER = new Logger();
    public static final String ROOT =
            Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator + "facerecognizer";

    public static final String DATA_FILE = "data";
    public static final String MODEL_FILE = "model";
    public static final String LABEL_FILE = "label";

    /**
     * Saves a Bitmap object to disk for analysis.
     *
     * @param bitmap The bitmap to save.
     * @param filename The location to save the bitmap to.
     */
    public static void saveBitmap(final Bitmap bitmap, final String filename) {
        LOGGER.i("Saving %dx%d bitmap to %s.", bitmap.getWidth(), bitmap.getHeight(), ROOT);
        final File myDir = new File(ROOT);

        if (!myDir.mkdirs()) {
            LOGGER.i("Make dir failed");
        }

        final File file = new File(myDir, filename);
        if (file.exists()) {
            file.delete();
        }
        try {
            final FileOutputStream out = new FileOutputStream(file);
            bitmap.compress(Bitmap.CompressFormat.PNG, 99, out);
            out.flush();
            out.close();
        } catch (final Exception e) {
            LOGGER.e(e, "Exception!");
        }
    }

    public static void copyAsset(AssetManager mgr, String filename) {
        Log.e("TEST","copyAsset");
        InputStream in = null;
        OutputStream out = null;
        OutputStream testout = null;

        try {
            File file = new File(ROOT + File.separator + filename);
            File testFile = new File(ROOT + File.separator + "TestFile");
            if (!file.exists()) {
                file.createNewFile();
            }
            if (!testFile.exists()) {
                testFile.createNewFile();
            }

            String s ="lame";
            byte[] testBuffer=s.getBytes();
            in = mgr.open(filename);
            out = new FileOutputStream(file);
            testout = new FileOutputStream(testFile);
            byte[] buffer = new byte[1024];
            int read;
            int testread;
            while((read = in.read(buffer)) != -1){
                out.write(buffer, 0, read);
            }
            while((testread = in.read(testBuffer)) != -1){
                testout.write(testBuffer, 0, testread);
            }
        } catch (Exception e) {
            LOGGER.e(e, "Excetion!");
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    LOGGER.e(e, "IOExcetion!");
                }
            }
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                    LOGGER.e(e, "IOExcetion!");
                }
            }
        }
    }

    public static void appendText(String text, String filename) {
        try(FileWriter fw = new FileWriter(ROOT + File.separator + filename, true);
            PrintWriter out = new PrintWriter(new BufferedWriter(fw))) {
            out.println(text);
        } catch (IOException e) {
            //exception handling left as an exercise for the reader
            LOGGER.e(e, "IOException!");
        }
    }

    public static ArrayList<String> readLabel(String filename) throws FileNotFoundException{
        Scanner s = new Scanner(new File(ROOT + File.separator + filename));
        ArrayList<String> list = new ArrayList<>();
        while (s.hasNextLine()){
            list.add(s.nextLine());
        }
        s.close();

        return list;
    }
}
