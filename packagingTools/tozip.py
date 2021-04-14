import zipfile
import os
import xml.etree.ElementTree as ET
import shutil
from lxml import html


def unzip(zip_src, dst_dir):
    # 解压缩zip文件，zip_src为压缩包的绝对路径，dst_dir为文件存储的绝对路径
    res = zipfile.is_zipfile(zip_src)  # 判断是否zip文件
    dst_res = os.path.exists(dst_dir)  # 判断文件存储路径是否存在
    if res:
        if dst_res:
            org = zipfile.ZipFile(zip_src, 'r')  # 读取zip内容
            for file in org.namelist():
                org.extract(file, dst_dir)  # 逐个写入文件夹
            org.close()
        else:
            print('Path is not exist')
    else:
        print('This is not zip')


def update_xml(xml_file):
    # xml文件中measure节点中增加type属性，xml_file为xml文件绝对路径
    update_tree = ET.parse(xml_file)
    root = update_tree.getroot()  # 获取xml信息体的根节点
    measure = root.find("measure")  # 找到measure节点
    measure.set("type", "H5")  # 在measure节点增加type属性
    update_tree.write(xml_file)  # 写入xml文件，xml_declaration为写入xml头信息
    etree = html.etree
    tree = etree.parse(xml_file)
    # 设置xml头信息
    with open(xml_file, "w") as f:
        f.write(etree.tostring(tree, encoding="UTF-8", standalone=False, xml_declaration=True).decode("UTF-8"))


def copy_file(src_file, dst_path):
    # 剪切（移动）文件（夹）到指定路径，src_file为需拷贝的文件（夹）绝对路径，dst_path为移动后的目标路径
    shutil.move(src_file, dst_path)


def get_zip_file(input_path, result):
    files = os.listdir(input_path)
    for file in files:
        result.append(input_path + '/' + file)
        if os.path.isdir(input_path + '/' + file):
            get_zip_file(input_path + '/' + file, result)


def zip_file(src_dir, filename):
    # 压缩指定文件夹，src_dir为需压缩的文件夹的绝对路径，filename为文件夹名称
    zip_name = src_dir + ".zip"
    z = zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED)
    filelist = []
    f_path = src_dir.replace(src_dir, filename)
    get_zip_file(f_path, filelist)
    for file in filelist:
        z.write(file)
    z.close()


def delete_file(path):
    shutil.rmtree(path)


if __name__ == "__main__":
    file_name = ""
    for root, dirs, files in os.walk(os.getcwd()):
        for file in files:
            if os.path.splitext(file)[1] == '.zip':
                file_name = os.path.splitext(file)[0]  # 文件名称
    root = os.getcwd() + "/"  # 父目录
    org_src = root + file_name + ".zip"  # zip文件路径
    xml_src = root + file_name + "/product.xml"  # xml文件路径
    H5_file = root + "H5"  # H5文件夹绝对路径
    unzip(org_src, root)  # 解压缩
    update_xml(xml_src)  # 更新xml文件
    copy_file(H5_file, root + file_name)  # 移动H5文件夹
    file_path = root + file_name
    zip_path = root + file_name + ".zip"
    zip_file(file_path, file_name)  # 压缩文件夹
    delete_file(file_path)  # 删除文件夹
