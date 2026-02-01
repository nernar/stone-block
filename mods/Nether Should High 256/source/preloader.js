let raf = new java.io.RandomAccessFile(new java.io.File("/data/data/com.zheka.horizon/app_soexec_pack/libminecraftpe.so"), "rw");
let totalLen = raf.length();
let channel = raf.getChannel();
let buffer = channel.map(java.nio.channels.FileChannel.MapMode.READ_WRITE, 0x63a8405, 3);
let bytes = {"-12": -4, "0": -128, "3": 112};
for(let i=0; i<3; i++){
    let src = buffer.get(i);
    if ((i == 0 && src != -12) || totalLen != 150583640) break; //Hardcode, only support 1.16.0.201.
    buffer.put(i, src + bytes[src.toString()]);
}
buffer.force();
buffer.clear();
channel.close();
raf.close();